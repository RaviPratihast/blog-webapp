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

export const resources: Resource[] = [
  createResource(
    1,
    "Article",
    "Sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "Quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
    "John Doe",
    "Mar 16, 2024"
  ),
  createResource(
    2,
    "Article",
    "Qui est esse",
    "Est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
    "Jane Smith",
    "Mar 16, 2024"
  ),
];
