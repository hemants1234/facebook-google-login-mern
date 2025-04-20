import React from 'react'

function PostCard({title, description, createdAt}) {
    console.log(title)

    const newdate = new Date(createdAt).toLocaleString();

    console.log(newdate);

    return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-gray-400 flex justify-between items-center">
        <span>By </span>
        <span>Date:- {newdate}</span>
      </div>
    </div>
    )
}

export default PostCard
