<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to AfroCommunity</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #111;
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      color: #f4c430;
    }
    .content {
      padding: 30px;
      color: #333;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #f4c430;
      color: #000;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>

  <div class="container">
    
    <div class="header">
      <h1>AfroCommunity</h1>
      <p>Connect • Share • Grow</p>
    </div>

    <div class="content">
      <h2>Welcome, {{$user->name}} </h2>

      <p>
        We're excited to have you join <strong>AfroCommunity</strong>! 🎉  
        This is your space to connect with others, share ideas, and grow together.
      </p>

      <p>
        Whether you're here to network, learn, or just explore — you're in the right place.
      </p>

      <p>
        Get started by completing your profile and discovering what the community has to offer.
      </p>

      <a href="" class="button">Get Started</a>

      <p style="margin-top: 30px;">
        If you have any questions, feel free to reach out. We're here for you 💛
      </p>

      <p>
        — The AfroCommunity Team
      </p>
    </div>

    <div class="footer">
      <p>© 2026 AfroCommunity. All rights reserved.</p>
    </div>

  </div>

</body>
</html>