export const revalidate = 0; // always fetch fresh from Sanity

import type { Metadata } from 'next';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import AdmissionsForm from '@/components/AdmissionsForm';
import { getAdmissions } from '@/sanity/lib/queries';

const defaultFitItems = [
  'You share our Statement of Faith and are committed to raising your children in the Christian tradition.',
  "You see yourself as your child's primary teacher, with The Flame as an enrichment and discipleship partner.",
  'You\'re ready to participate in the community — not simply drop off and pick up.',
  "You believe your child's education and spiritual formation should be connected, not separated.",
  'You want your child to be known, challenged, encouraged, and rooted in Christ.',
];

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAdmissions();
  return {
    title:       cms?.seoTitle       ?? 'Admissions',
    description: cms?.seoDescription ?? 'Admissions at The Flame is more than paperwork. It\'s the beginning of a Spirit-led partnership between your family and a community committed to helping your child grow in faith, wisdom, and purpose.',
    openGraph: {
      title:       cms?.seoTitle       ?? 'Admissions | The Flame Christian Co-op',
      description: cms?.seoDescription ?? 'Begin the admissions process for The Flame Christian Co-op.',
    },
    alternates: { canonical: 'https://theflame.org/admissions' },
  };
}

export default async function AdmissionsPage() {
  const cms = await getAdmissions();

  const heroHeadline = cms?.heroHeadline ?? 'The Journey Into The Flame Starts Here.';
  const heroLead     = cms?.heroLead     ?? "Admissions at The Flame is more than paperwork. It's the beginning of a Spirit-led partnership between your family and a community committed to helping your child grow in faith, wisdom, and purpose.";
  const fitItems     = cms?.fitItems?.length ? cms.fitItems : defaultFitItems;
  const enrollmentOpen           = cms?.enrollmentOpen           ?? true;
  const enrollmentOpenMessage    = cms?.enrollmentOpenMessage    ?? 'Enrollment for the upcoming school year is open. Complete the form to begin the admissions process and receive information about upcoming information meetings.';
  const enrollmentClosedMessage  = cms?.enrollmentClosedMessage  ?? 'Enrollment for the upcoming school year is currently closed. Complete the form to be added to our interest list and we\'ll reach out when enrollment reopens.';
  const afterEnrollBody          = cms?.afterEnrollBody          ?? null;

  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 64px', background: 'var(--cream2)' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
            Admissions
          </span>
          <h1 style={{ marginBottom: '20px' }}>{heroHeadline}</h1>
          <p className="lead">{heroLead}</p>
        </div>
      </section>

      {/* BEFORE YOU APPLY */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">Before You Apply</span>
              <h2 style={{ marginBottom: '20px' }}>What You&apos;re Saying Yes To.</h2>
              <p style={{ marginBottom: '20px' }}>
                The Flame is a cooperative — every family who joins is a partner, not just a participant. Before applying, it helps to know what you&apos;re stepping into:
              </p>
              <ul className="fit-list">
                {fitItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="split__media reveal reveal-delay-1">
              <ImagePlaceholder label="Photo: Welcoming family community moment" aspectRatio="tall" />
            </div>
          </div>
        </div>
      </section>

      {/* AFTER YOU ENROLL */}
      <section style={{ padding: 'var(--section-v) 0' }}>
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">After You Enroll</span>
              <h2 style={{ marginBottom: '20px' }}>You&apos;re Not Just on a Roster. You&apos;re Part of the Family.</h2>
              {afterEnrollBody ? (
                <p>{afterEnrollBody}</p>
              ) : (
                <>
                  <p>Once enrolled, your family receives access to the Parent Portal — your hub for schedules, curriculum resources, upcoming events, documents, payments, and onboarding information.</p>
                  <p style={{ marginTop: '12px' }}>The Flame team will walk you through next steps so you know what to expect, what&apos;s due, and how to prepare for the school year.</p>
                  <p style={{ marginTop: '12px', fontStyle: 'italic', fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                    We&apos;ll take care of the onboarding. You take care of showing up.
                  </p>
                </>
              )}
              <div style={{ marginTop: '32px' }}>
                <a href="#admissions-form" className="btn btn--primary" onClick={undefined}>Begin Admissions</a>
              </div>
            </div>
            <div className="split__media reveal reveal-delay-1">
              <ImagePlaceholder label="Photo: Parent and child at The Flame" aspectRatio="wide" />
            </div>
          </div>
        </div>
      </section>

      {/* FORM (client component handles steps + form + enrollment banner) */}
      <AdmissionsForm
        enrollmentOpen={enrollmentOpen}
        enrollmentOpenMessage={enrollmentOpenMessage}
        enrollmentClosedMessage={enrollmentClosedMessage}
      />
    </>
  );
}
