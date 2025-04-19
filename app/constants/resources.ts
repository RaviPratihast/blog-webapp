interface Author {
  name: string;
  date: string;
}

interface Resource {
  id: number;
  category: string;
  title: string;
  description: string;
  author: Author;
}

export function createResource(
  id: number,
  category: string,
  title: string,
  description: string,
  authorName: string,
  date: string
): Resource {
  return {
    id,
    category,
    title,
    description,
    author: {
      name: authorName,
      date,
    },
  };
}
