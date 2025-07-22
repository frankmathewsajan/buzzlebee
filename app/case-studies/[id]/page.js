import CaseStudyClient from './CaseStudyClient';
import projectsData from '../../projects.json';

export function generateStaticParams() {
  // Get all projects that have case studies
  const projectsWithCaseStudies = projectsData.filter(project => project.caseStudy);
  
  return projectsWithCaseStudies.map(project => ({
    id: project.id
  }));
}

export default async function CaseStudyDetail({ params }) {
  const { id } = await params;
  
  return <CaseStudyClient id={id} />;
}
