import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
      >
        ← Back
      </button>

      <h1 style={{ textAlign: "center", color: "#333" }}>Privacy Policy for TyreSaathi</h1>
      <p style={{ textAlign: "center", color: "#666" }}><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <hr style={{ margin: "20px 0" }} />

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>TyreSaathi</strong>. We value your trust and are committed to protecting your personal information. 
        This Privacy Policy explains how we collect, use, and safeguard your data when you use our web application.
      </p>

      <h2>2. Information We Collect</h2>
      <p>When you register and use TyreSaathi, we may collect the following information:</p>
      <ul>
        <li><strong>Personal Details:</strong> Name, Email Address, and Phone Number.</li>
        <li><strong>Shop Details:</strong> Shop Name, Location, and Inventory data (for Shop Owners).</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our platform to improve user experience.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the collected data strictly to provide and improve our services:</p>
      <ul>
        <li>To create and manage your account.</li>
        <li>To connect customers with shop owners for tyre-related services and products.</li>
        <li>To send important updates regarding bookings or security alerts.</li>
        <li>We <strong>do not</strong> sell your personal data to any third-party marketing companies.</li>
      </ul>

      <h2>4. Data Security (Firebase)</h2>
      <p>
        Your data is stored securely using <strong>Google Firebase</strong>. We use industry-standard encryption and security rules 
        to ensure that your personal information, passwords, and shop data remain safe and are only accessible to authorized users.
      </p>

      <h2>5. User Rights</h2>
      <p>
        You have full control over your data. You can update your profile information at any time. 
        If you wish to delete your account and all associated data, you can contact our support team.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. 
        Continued use of the app implies your acceptance of the updated policy.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or legal concerns regarding this Privacy Policy, please contact us at: <br/>
        <strong>Email:</strong> tyresathi@gmail.com
      </p>

      <div style={{ textAlign: "center", marginTop: "40px", padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
        <p>By using TyreSaathi, you agree to the terms outlined in this Privacy Policy.</p>
      </div>
    </div>
  );
}
