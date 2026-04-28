'use client';

import { useState } from 'react';

interface AdmissionsFormProps {
  enrollmentOpen:         boolean;
  enrollmentOpenMessage:  string;
  enrollmentClosedMessage: string;
}

const admissionSteps = [
  { num: 1, title: 'Attend an Information Meeting', body: 'All prospective families attend an information meeting before applying. This is your chance to understand the heart of The Flame, ask every question you have, and prayerfully decide if this community is the right fit for your family.' },
  { num: 2, title: 'Submit Your Application', body: "Complete and submit the application online. After submitting, you'll receive a prompt to pay the application and interview fee. Applications are not reviewed until the fee is received.", fee: 'Fee: $50 first child · $25 each additional child · $75 family maximum · Non-refundable' },
  { num: 3, title: 'Family Interview', body: "Our team will reach out to schedule your family interview. This step is relational. We're not just reviewing paperwork — we're learning about your family and prayerfully discerning fit together." },
  { num: 4, title: 'Acceptance Notification', body: "Within three weeks of your interview, you'll hear from us. Accepted, waitlisted, or if placement isn't currently possible — every family is communicated with honestly and with care." },
  { num: 5, title: "Secure Your Child's Spot", body: "Upon acceptance, pay the supply fee within 3 business days to hold your child's place in the program.", fee: 'Supply fee: $200 for Sparks/Elementary · $150 for Discipleship · Non-refundable' },
  { num: 6, title: 'Complete Registration + Sign the Handbook', body: 'Pay the registration fee and receive access to the Family Handbook to review and sign.', fee: 'Reg. fee: $500 for Sparks · $1,250 for Elementary and Discipleship · Non-refundable' },
  { num: 7, title: 'Background Check + Parent Portal Access', body: "After the handbook is submitted, the background check fee is collected per parent. Then your family receives full access to the Parent Portal — schedules, curriculum, events, payments, and everything you need to start the year well.", fee: 'Background fee: $20 per parent' },
];

export default function AdmissionsForm({ enrollmentOpen, enrollmentOpenMessage, enrollmentClosedMessage }: AdmissionsFormProps) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    numChildren: '', ages: '', programs: '', message: '',
  });
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New Admissions Inquiry — The Flame Christian Co-op',
          from_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email, phone: formData.phone,
          num_children: formData.numChildren, ages: formData.ages,
          programs_of_interest: formData.programs, message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch { setSubmitted(true); }
    finally { setSubmitting(false); }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      {/* ADMISSIONS PROCESS */}
      <section className="section--cream">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '560px', marginBottom: '32px' }}>
            <span className="eyebrow">The Admissions Process</span>
            <h2 style={{ marginBottom: '12px' }}>How It Works — Step by Step.</h2>
            <p>Seven clear steps. You&apos;ll know exactly where you are and what&apos;s next at every stage.</p>
          </div>
          <div className="steps reveal">
            {admissionSteps.map((step) => (
              <div key={step.num} className="step">
                <div className="step__num">{step.num}</div>
                <div className="step__body">
                  <div className="step__title">{step.title}</div>
                  <p className="step__text">{step.body}</p>
                  {step.fee && <div className="step__fee">{step.fee}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST INFO FORM */}
      <section className="section--cream2" id="admissions-form">
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <div className="enroll-banner">
                <div className={`enroll-banner__dot${enrollmentOpen ? '' : ' enroll-banner__dot--closed'}`} />
                <p className="enroll-banner__text">
                  <strong>Enrollment Status:</strong>{' '}
                  {enrollmentOpen ? enrollmentOpenMessage : enrollmentClosedMessage}
                </p>
              </div>
              <span className="eyebrow">Request Information</span>
              <h2 style={{ marginBottom: '20px' }}>Have Questions? We&apos;d Love to Meet Your Family.</h2>
              <p style={{ marginBottom: '28px' }}>
                Tell us a little about your family and what you&apos;re looking for. Someone from our team will follow up with next steps and upcoming information meeting details.
              </p>
              {submitted ? (
                <div style={{ background: 'var(--cream)', borderLeft: '3px solid var(--gold)', padding: '24px 28px', borderRadius: '0 var(--radius) var(--radius) 0' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--black)', marginBottom: '8px' }}>
                    Thank you! We&apos;ll be in touch soon.
                  </p>
                  <p style={{ color: 'var(--mid)', fontSize: '.9rem' }}>
                    Someone from The Flame team will reach out within a few business days with next steps and upcoming information meeting details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="field-label" htmlFor="firstName">First Name</label>
                      <input id="firstName" name="firstName" type="text" placeholder="Your first name" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="lastName">Last Name</label>
                      <input id="lastName" name="lastName" type="text" placeholder="Your last name" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" type="tel" placeholder="(000) 000-0000" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="numChildren">Number of Children</label>
                      <input id="numChildren" name="numChildren" type="text" placeholder="e.g. 2" value={formData.numChildren} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                      <label className="field-label" htmlFor="ages">Ages / Grade Levels</label>
                      <input id="ages" name="ages" type="text" placeholder="e.g. 7, 10" value={formData.ages} onChange={handleChange} />
                    </div>
                    <div className="form-field form-field--full">
                      <label className="field-label" htmlFor="programs">Programs of Interest</label>
                      <input id="programs" name="programs" type="text" placeholder="e.g. Embers, Discipleship I" value={formData.programs} onChange={handleChange} />
                    </div>
                    <div className="form-field form-field--full">
                      <label className="field-label" htmlFor="message">Message / Questions</label>
                      <textarea id="message" name="message" placeholder="Tell us a little about your family and what you're looking for..." value={formData.message} onChange={handleChange} />
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <button type="submit" className="btn btn--primary" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Submit Request'}
                    </button>
                  </div>
                  <p className="form-consent" style={{ marginTop: '12px' }}>
                    By submitting this form, you agree to be contacted by The Flame Christian Co-op regarding admissions, programs, and enrollment.
                  </p>
                </form>
              )}
            </div>
            <div className="split__media reveal reveal-delay-1" style={{ paddingTop: '48px' }}>
              <ImagePlaceholder label="Photo: Welcoming community atmosphere" aspectRatio="tall" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
