# Contact Form Integration Guide

## Setup Instructions

### 1. Install EmailJS Package
```bash
npm install @emailjs/browser
```

### 2. Configure Environment Variables
Add your EmailJS credentials to `.env.local`:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_mjicue8
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
```

### 3. EmailJS Setup
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Create an email service (Gmail already configured: `service_mjicue8`)
3. Create an email template using the provided HTML template
4. Copy your Public Key, Service ID, and Template ID to `.env.local`

### 4. Email Template Variables
When creating your EmailJS template, use these variables:
- `{{user_name}}` - Sender's full name
- `{{user_email}}` - Sender's email address
- `{{message}}` - The message content
- `{{date}}` - Current date (auto-populated)
- `{{time}}` - Current time (auto-populated)

### 5. Using the Contact Form

```tsx
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <ContactForm />
      </div>
    </div>
  )
}
```

### 6. Features Included

#### ✅ Form Validation
- Full name (required, min 2 characters)
- Email (required, valid email format)
- Message (required, 10-1000 characters)

#### ✅ User Experience
- Real-time validation feedback
- Loading states during submission
- Success/error messages with animations
- Character counter for message field
- Responsive design for all devices

#### ✅ Security & Best Practices
- Client-side validation
- Environment variable usage
- No server-side window usage
- Proper error handling
- TypeScript support

#### ✅ Animations
- Smooth entrance animations with Framer Motion
- Hover effects and micro-interactions
- Loading spinners
- Success/error state transitions

### 7. Customization Options

#### Colors & Theme
The form automatically adapts to your Tailwind CSS theme:
- Uses `primary`, `foreground`, `muted-foreground`, `destructive` colors
- Supports dark mode out of the box

#### Styling
Modify the component to match your brand:
- Update colors in the className props
- Adjust spacing and sizing
- Custom animations via Framer Motion variants

#### Form Fields
Add or remove fields by:
1. Updating the `FormData` interface
2. Adding/removing Input/Textarea components
3. Updating validation logic
4. Modifying the EmailJS template

### 8. Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build
```

### 9. Troubleshooting

#### Common Issues:
1. **Email not sending**: Check your EmailJS configuration and API keys
2. **Environment variables not working**: Ensure `.env.local` is in project root
3. **Form not validating**: Check browser console for TypeScript errors
4. **Styling issues**: Verify Tailwind CSS is properly configured

#### Debug Mode:
Add console logging to track form submission:
```tsx
console.log("Form data:", formData)
console.log("EmailJS result:", result)
```

### 10. Production Deployment

1. Add environment variables to your hosting platform
2. Ensure EmailJS domain is whitelisted in your EmailJS account
3. Test the form in production environment
4. Monitor email delivery success rate

---

## EmailJS Template Setup

1. Go to EmailJS Dashboard → Email Templates
2. Create new template
3. Copy the HTML content from `EMAILJS_TEMPLATE.html`
4. Set template variables:
   - `{{user_name}}` - From name field
   - `{{user_email}}` - From email field  
   - `{{message}}` - From message field
5. Save and copy the Template ID to your `.env.local`

The template includes:
- Professional gradient header
- Sender information display
- Formatted message content
- Reply-to button functionality
- Responsive design
- Dark mode support
