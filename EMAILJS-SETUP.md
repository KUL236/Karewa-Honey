# EmailJS setup (all enquiries go to Karewabee@gmail.com)

1. https://www.emailjs.com -> sign up -> Email Services -> Add service -> Gmail -> connect Karewabee@gmail.com. Copy the **Service ID**.
2. Account -> API keys -> copy the **Public key**.
3. Email Templates -> Create template. Set "To email" = `{{to_email}}`, "Reply to" = `{{reply_to}}`, Subject = `New {{source}} enquiry: {{enquiry_type}} from {{from_name}}`, and Content:
```
Name: {{from_name}}
Phone: {{phone}}
Email: {{email}}
Type: {{enquiry_type}}
Source: {{source}} (page {{page}})
Time: {{sent_at}}

{{message}}
```
   Copy the **Template ID**. Make one template, or three (website / wholesale / chatbot) if you want separate inboxes or subjects.
4. Add the ids as environment variables (see `.env.example`): VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_TEMPLATE_ID. Then redeploy with "Clear cache and deploy site".
5. EmailJS dashboard -> Account -> Security: allow only `karewahoney.com` as the domain.
