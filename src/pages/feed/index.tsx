import React from "react";

const FeedPage = () => {
  const comments = [
    { id: 1, author: "User1", content: "This is a comment" },
    { id: 2, author: "User2", content: "Another comment here" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">피드</h1>
      <ul className="mt-4 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-2 rounded">
            <strong>{comment.author}</strong>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
