import { ResourceCardProps } from "../components/ResourceCard";

// Helper function to generate resource objects
const createResource = (
  id: number,
  category: string,
  title: string,
  description: string,
  authorName: string,
  date: string
): ResourceCardProps => ({
  id,
  category,
  title,
  description,
  author: {
    avatar: "/avatars/placeholder.svg",
    name: authorName,
    date,
  },
  image: "/resources/placeholder.svg",
});

export const resources: ResourceCardProps[] = [
  createResource(
    1,
    "Design",
    "UX review presentations",
    "How do you create compelling presentations that wow your colleagues?",
    "Olivia Rhye",
    "20 Jan 2023"
  ),
  createResource(
    2,
    "Product",
    "Migrating to Linear 101",
    "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
    "Phoenix Baker",
    "19 Jan 2023"
  ),
  createResource(
    3,
    "Software Engineering",
    "Building your API Stack",
    "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    "Lana Steiner",
    "18 Jan 2023"
  ),
  createResource(
    4,
    "Design",
    "Bill Walsh leadership lessons",
    "How to apply the winning formulas from football to the workplace.",
    "Alec Whitten",
    "17 Jan 2023"
  ),
  createResource(
    5,
    "Product",
    "PM mental models",
    "Mental models are simple expressions of complex processes or relationships.",
    "Demi Wilkinson",
    "16 Jan 2023"
  ),
  createResource(
    6,
    "Software Engineering",
    "What is Wireframing?",
    "Introduction to Wireframing and its principles. Learn from the best resources.",
    "Orlando Diggs",
    "15 Jan 2023"
  ),
  createResource(
    7,
    "Design",
    "How collaboration makes us better designers",
    "Collaboration can make our teams stronger, and our individual designs better.",
    "Natali Craig",
    "14 Jan 2023"
  ),
  createResource(
    8,
    "Product",
    "Our top 10 Javascript frameworks to use",
    "JavaScript frameworks make development easy with extensive features and scalability.",
    "Drew Cano",
    "13 Jan 2023"
  ),
  createResource(
    9,
    "Software Engineering",
    "Personalize Creating a Better UX Community",
    "Let's talk about building a stronger and healthier UX community.",
    "Orlando Diggs",
    "12 Jan 2023"
  ),
];
