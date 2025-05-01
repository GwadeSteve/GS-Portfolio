import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_0gi789q';
const CLIENT_TEMPLATE_ID = 'template_x46uzk8';
const ADMIN_TEMPLATE_ID = 'template_bgnuqvo';
const PUBLIC_KEY = 'JxJzhK5-fCKgbJhbe';

/**
 * Sends form data via EmailJS to both admin and client
 * @param {Object} formData
 * @returns {Promise} 
 */
export const sendEmail = async(formData) => {
    const submissionDate = new Date().toLocaleString();

    // Format parameters to match exactly what the template expects
    const adminTemplateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        contact_preference: formData.contactPreference === 'email' ? 'Email' : 'Phone',
        project_type: getProjectTypeLabel(formData.projectType),
        budget: getBudgetLabel(formData.budget),
        timeline: getTimelineLabel(formData.timeline),
        project_description: formData.projectDescription || 'No description provided',
        referral_source: getReferralLabel(formData.referralSource) || 'Not specified',
        reply_to: formData.email,
        submission_date: submissionDate,
        email: formData.email
    };

    const clientTemplateParams = {
        from_name: formData.fullName,
        email: formData.email,
        project_type: getProjectTypeLabel(formData.projectType),
        budget: getBudgetLabel(formData.budget),
        timeline: getTimelineLabel(formData.timeline),
        contact_preference: formData.contactPreference === 'email' ? 'Email' : 'Phone'
    };

    try {
        emailjs.init(PUBLIC_KEY);
        const clientResponse = await emailjs.send(
            SERVICE_ID,
            CLIENT_TEMPLATE_ID,
            clientTemplateParams
        );

        console.log('Client email sent successfully:', clientResponse);
        const adminResponse = await emailjs.send(
            SERVICE_ID,
            ADMIN_TEMPLATE_ID,
            adminTemplateParams
        );

        console.log('Admin email sent successfully:', adminResponse);

        return {
            clientResponse,
            adminResponse
        };
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

function getProjectTypeLabel(id) {
    const types = {
        'web-development': 'Web Development',
        'mobile-app': 'Mobile App',
        'ai-solution': 'AI Solution',
        'data-analysis': 'Data Analysis',
        'consulting': 'Consulting',
        'other': 'Other'
    };
    return types[id] || id;
}

function getBudgetLabel(id) {
    const budgets = {
        'small': 'Under $5,000',
        'medium': '$5,000 - $15,000',
        'large': '$15,000 - $50,000',
        'enterprise': 'Over $50,000',
        'discuss': 'To be discussed'
    };
    return budgets[id] || id;
}

function getTimelineLabel(id) {
    const timelines = {
        'urgent': 'Urgent (< 1 month)',
        'standard': '1-3 months',
        'relaxed': '3-6 months',
        'flexible': 'Flexible'
    };
    return timelines[id] || id;
}

function getReferralLabel(id) {
    const referrals = {
        'search': 'Search Engine',
        'social': 'Social Media',
        'reference': 'Personal Reference',
        'article': 'Article or Blog',
        'other': 'Other'
    };
    return referrals[id] || id;
}