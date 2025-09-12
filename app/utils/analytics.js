import { analytics } from "../../lib/firebase";
import { logEvent } from "firebase/analytics";

// Common analytics events for the portfolio
export const trackEvent = (eventName, eventParams = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, {
      timestamp: Date.now(),
      ...eventParams
    });
  }
};

// Predefined event tracking functions
export const trackPortfolioEvents = {
  // Navigation events
  portfolioNavigation: (destinationPath) => 
    trackEvent('portfolio_navigation', { destination_path: destinationPath, source: 'portfolio_map' }),
  
  // Contact events
  contactFormSubmit: (variant, hasSocialHandles) => 
    trackEvent('contact_form_submit', { form_variant: variant, has_social_handles: hasSocialHandles }),
  
  // External link events
  externalLinkClick: (url, source = 'unknown') => 
    trackEvent('external_link_click', { destination_url: url, source }),
  
  // Project events
  projectView: (projectId, projectTitle) => 
    trackEvent('project_view', { project_id: projectId, project_title: projectTitle }),
  
  // Resume events
  resumeView: () => 
    trackEvent('resume_view'),
  
  resumeDownload: () => 
    trackEvent('resume_download'),
  
  // Portfolio map events
  portfolioMapOpen: () => 
    trackEvent('portfolio_map_open'),
  
  portfolioMapClose: () => 
    trackEvent('portfolio_map_close'),
  
  // Case study events
  caseStudyView: (caseStudyId, caseStudyTitle) => 
    trackEvent('case_study_view', { case_study_id: caseStudyId, case_study_title: caseStudyTitle }),
  
  // Social media events
  socialMediaClick: (platform) => 
    trackEvent('social_media_click', { platform }),
  
  // Search and filter events
  projectFilter: (filterType, filterValue) => 
    trackEvent('project_filter', { filter_type: filterType, filter_value: filterValue }),
  
  // Engagement events
  scrollProgress: (percentScrolled, pagePath) => 
    trackEvent('scroll_progress', { percent_scrolled: percentScrolled, page_path: pagePath }),
  
  timeOnPage: (timeSpent, pagePath) => 
    trackEvent('time_on_page', { time_spent_seconds: timeSpent, page_path: pagePath })
};

export default trackPortfolioEvents;