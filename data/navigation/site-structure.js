export const SITE_STRUCTURE = {
  name: 'Portfolio',
  path: '/',
  icon: 'FaHome',
  children: [
    {
      name: 'About',
      path: '/about',
      icon: 'FaUser',
      children: [
        {
          name: 'Blog',
          path: 'https://medium.com/@frankmathewsajan',
          icon: 'FaPen',
          external: true,
          externalUrl: 'https://medium.com/@frankmathewsajan'
        },
        {
          name: 'Resume',
          path: '/resume',
          icon: 'FaFileAlt'
        }
      ]
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: 'FaTools',
      children: [
        {
          name: 'Case Studies',
          path: '/case-studies',
          icon: 'FaChartBar'
        },
        {
          name: 'Certifications',
          path: '/certifications',
          icon: 'FaAward'
        }
      ]
    }
  ]
};
