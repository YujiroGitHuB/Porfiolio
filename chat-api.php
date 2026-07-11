<?php
// ============================================================
// chat-api.php — server-side proxy to Google Gemini for the
// "Lexon" portfolio chatbot. Keeps the API key off the client.
// Requires config.php (gitignored) — see config.example.php.
// ============================================================

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['reply' => 'Method not allowed.']);
    exit;
}

$input   = json_decode(file_get_contents('php://input'), true);
$userMsg = isset($input['message']) ? trim($input['message']) : '';

if ($userMsg === '') {
    http_response_code(400);
    echo json_encode(['reply' => 'Please type a message.']);
    exit;
}

// Basic abuse guard: cap the message length.
if (mb_strlen($userMsg) > 1000) {
    $userMsg = mb_substr($userMsg, 0, 1000);
}

$systemContext = <<<TXT
You are Lexon, a friendly assistant for Charles Nixon Cayading's portfolio website.

About Charles:
- Web Developer and IT Instructor at Binalatongan Community College.
- 1+ year of hands-on web development experience.
- Based in Basista, Pangasinan, Philippines.

Skills:
- Frontend: HTML5, CSS3, JavaScript, React, Vue, Bootstrap, Tailwind, Material UI, Flutter.
- Backend: PHP, MySQL, Laravel, REST API, Docker, AWS, Supabase, Firebase.
- Tools: GitHub.

Projects:
- IPT Link Submission
- BCC SAS QR Code Generator
- BCC Student Attendance System
- Student Attendance Tracker
- FormFlow (forms management platform)
- eGradeBook (digital gradebook)
- SMART - Student Manual Access and Record Tracker

Contact: charlesnixoncayading@gmail.com | Facebook: charlesnixon.cayading

Keep answers concise, friendly, and relevant to Charles' portfolio.
If asked something unrelated, gently redirect to topics about Charles.
TXT;

$payload = [
    'system_instruction' => ['parts' => [['text' => $systemContext]]],
    'contents' => [
        ['role' => 'user', 'parts' => [['text' => $userMsg]]],
    ],
    'generationConfig' => [
        'temperature'     => 0.7,
        'maxOutputTokens' => 600,
    ],
];

$endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/'
    . rawurlencode(GEMINI_MODEL) . ':generateContent';

$ch = curl_init($endpoint);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-goog-api-key: ' . GEMINI_API_KEY,
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_TIMEOUT        => 30,
]);

$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $status >= 400) {
    http_response_code(502);
    echo json_encode(['reply' => "Sorry, I couldn't reach the assistant right now. Please try again."]);
    exit;
}

$data  = json_decode($response, true);
$reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

if ($reply === '') {
    echo json_encode(['reply' => "Sorry, I couldn't get a response right now."]);
    exit;
}

echo json_encode(['reply' => $reply]);
