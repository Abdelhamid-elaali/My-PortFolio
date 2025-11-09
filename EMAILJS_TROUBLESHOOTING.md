# EmailJS Troubleshooting Guide

## 🔍 Debug Steps for Email Issues

### 1. **Check Browser Console**
Open your browser's developer console (F12) and look for:
- Any JavaScript errors
- EmailJS debug information
- Network requests to EmailJS

### 2. **Verify EmailJS Configuration**
Your current configuration:
```
Public Key: SOVZubj7w7fYEefz9 ✅
Service ID: service_mjicue8 ✅  
Template ID: template_0s3krl7 ✅
```

### 3. **Common Issues & Solutions**

#### **Issue 1: Template Variables Not Matching**
**Problem**: Your EmailJS template variables don't match the form field names.

**Solution**: Ensure your EmailJS template uses:
- `{{user_name}}` (not {{fullName}})
- `{{user_email}}` (not {{email}})
- `{{message}}`

#### **Issue 2: Email Service Not Connected**
**Problem**: Gmail service not properly connected.

**Solution**: 
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click on "Email Services"
3. Verify `service_mjicue8` is connected to `abdelhamidelaali.bs007@gmail.com`
4. If not, reconnect the service

#### **Issue 3: Template Not Active**
**Problem**: Email template is not active or properly configured.

**Solution**:
1. Go to EmailJS Dashboard → Email Templates
2. Find `template_0s3krl7`
3. Ensure it's **Active** (green status)
4. Check that all variables are correctly set

#### **Issue 4: Recipient Email Not Set**
**Problem**: Template doesn't have a recipient email configured.

**Solution**:
1. Edit your template in EmailJS
2. Set "To Email" to your receiving email: `abdelhamidelaali.bs007@gmail.com`
3. Save the template

#### **Issue 5: Domain Not Whitelisted**
**Problem**: Your domain is not in the EmailJS whitelist.

**Solution**:
1. Go to EmailJS Dashboard → Account
2. Add your domain to the whitelist:
   - `localhost` (for development)
   - `yourdomain.com` (for production)

### 4. **Test with Debug Version**

Replace your contact form import temporarily:
```tsx
// Instead of:
import ContactForm from "@/components/contact-form"

// Use:
import ContactForm from "@/components/contact-form-debug"
```

This will show debug information in development mode.

### 5. **Manual EmailJS Test**

Test EmailJS directly in browser console:
```javascript
// Open browser console and run:
emailjs.sendForm(
  'service_mjicue8',
  'template_0s3krl7', 
  '#your-form-id',
  'SOVZubj7w7fYEefz9'
).then(
  result => console.log('SUCCESS!', result.status, result.text),
  error => console.log('FAILED...', error)
);
```

### 6. **Check Email Template Setup**

Your template should look like this:

**Subject**: New message from {{user_name}}

**Content**:
```
You received a new message from your portfolio contact form.

Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Sent from your portfolio website
```

### 7. **Verify Gmail Settings**

Ensure your Gmail account allows EmailJS:
1. Check Gmail spam folder
2. Make sure less secure apps are allowed (if using Gmail)
3. Check if Gmail is blocking the emails

### 8. **Quick Test Checklist**

- [ ] Browser console shows no errors
- [ ] EmailJS service is connected
- [ ] Template is active with correct variables
- [ ] Recipient email is set in template
- [ ] Domain is whitelisted in EmailJS
- [ ] Form fields have correct `name` attributes
- [ ] Environment variables are loaded correctly

### 9. **Still Not Working?**

If you've tried all above and it's still not working:

1. **Check the exact error message** in the debug console
2. **Verify your template ID** is correct: `template_0s3krl7`
3. **Try creating a new template** from scratch
4. **Contact EmailJS support** if service appears to be down

### 10. **Production Considerations**

For production deployment:
- Add your production domain to EmailJS whitelist
- Use environment variables properly
- Test in production environment
- Monitor email delivery rates

---

## 🚨 Most Common Fix

85% of EmailJS issues are caused by **incorrect template variables**. Double-check that your EmailJS template uses exactly:
- `{{user_name}}`
- `{{user_email}}` 
- `{{message}}`

NOT:
- `{{fullName}}`
- `{{email}}`

---

## 📞 Need More Help?

If you're still stuck, please share:
1. Browser console errors
2. Debug information from the debug form
3. Screenshot of your EmailJS template setup
4. Screenshot of your EmailJS service status
