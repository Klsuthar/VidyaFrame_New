import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCharts } from '@/components/home/FeaturedCharts';
import { PopularWorksheets } from '@/components/home/PopularWorksheets';
import { BrowseByClass } from '@/components/home/BrowseByClass';
import { BrowseBySubject } from '@/components/home/BrowseBySubject';
import { WhyVidyaFrame } from '@/components/home/WhyVidyaFrame';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'VidyaFrame',
            url: 'https://vidyaframe.com',
            description:
              'Download ready-made educational charts, worksheets, certificates & posters with school branding.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://vidyaframe.com/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <HeroSection />
      <FeaturedCharts />
      <BrowseByClass />
      <PopularWorksheets />
      <BrowseBySubject />
      <WhyVidyaFrame />
      <Testimonials />
      <FAQ />
    </>
  );
}
