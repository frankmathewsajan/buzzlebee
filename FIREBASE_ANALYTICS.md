# Firebase Analytics Setup

This document outlines the Firebase Analytics implementation for the portfolio website.

## Overview

Firebase Analytics has been integrated to track user interactions and provide insights into website usage. The implementation includes automatic page view tracking and custom event tracking for key user actions.

## Setup

### 1. Firebase Configuration
- **Project**: itsfrank
- **Analytics ID**: G-BSCTBEECZ4
- Configuration is stored in `lib/firebase.ts`

### 2. Automatic Tracking
- **Page Views**: Automatically tracked via `app/components/Analytics.js` component in the root layout
- **Route Changes**: Tracked using Next.js `usePathname` hook

### 3. Custom Event Tracking

#### Available Events:
- `portfolio_navigation` - Navigation through portfolio map
- `contact_form_submit` - Contact form submissions
- `external_link_click` - Clicks on external links
- `project_view` - Project page views
- `resume_view` - Resume page views
- `case_study_view` - Case study page views
- `social_media_click` - Social media link clicks
- `portfolio_map_open/close` - Portfolio map interactions

#### Usage Example:
```javascript
import { trackPortfolioEvents } from '../utils/analytics';

// Track a custom event
trackPortfolioEvents.projectView('project-id', 'Project Title');

// Track navigation
trackPortfolioEvents.portfolioNavigation('/about');
```

## Implementation Details

### Files Created/Modified:

1. **`lib/firebase.ts`** - Firebase initialization and configuration
2. **`app/components/Analytics.js`** - Automatic page view tracking component
3. **`app/utils/analytics.js`** - Custom event tracking utilities
4. **`app/hooks/useAnalytics.ts`** - Analytics hook for components
5. **`app/layout.js`** - Root layout with Analytics component
6. **`app/components/ContactModal.js`** - Contact form tracking
7. **`app/components/PortfolioMap.js`** - Navigation tracking
8. **`app/resume/page.js`** - Resume view tracking

### Event Parameters:
Events include contextual information such as:
- `timestamp` - Event occurrence time
- `destination_path` - For navigation events
- `source` - Event origin (e.g., 'portfolio_map')
- `form_variant` - For form submissions
- `project_id/title` - For project-related events

## Privacy Considerations

- Analytics data is processed according to Google Analytics privacy policies
- No personally identifiable information is tracked
- Users can opt out through browser settings

## Monitoring

Analytics data can be viewed in the Firebase Console:
1. Go to https://console.firebase.google.com/project/itsfrank
2. Navigate to Analytics > Events
3. View real-time and historical data

## Static Export Compatibility

The implementation is fully compatible with Next.js static export:
- Analytics only initializes on the client side
- Server-side rendering checks prevent initialization errors
- Build process remains unchanged

## Dependencies Added

```json
{
  "firebase": "^10.x.x"
}
```

## Future Enhancements

Potential improvements could include:
- User journey mapping
- Performance metrics tracking
- A/B testing integration
- Enhanced engagement metrics