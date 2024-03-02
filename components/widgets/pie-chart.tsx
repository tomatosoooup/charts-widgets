const fakePieInfo = [
  {
    id: "1",
    text: "I think it's enough of slices",
    author: "Dont TouchMy Pie",
  },

  {
    id: "2",
    text: "We need to add more sugar for sure!",
    author: "Willy Wonka Fake",
  },

  {
    id: "3",
    text: "Have you ever wondered what's going on inside kitchen ?",
    author: "Angry Client Anonym",
  },
];

export const PieChart = () => {
  return (
    <div className="flex flex-col gap-y-2 h-full overflow-y-auto">
      <h1 className="font-semibold">Pie Chart</h1>
      <div className="flex-1 bg-emerald-800/80 rounded-xl flex flex-col items-center gap-y-2 p-2 overflow-y-auto">
        {fakePieInfo.map(({ id, text, author }) => (
          <div
            className="border-[3px] border-white p-2 rounded-lg w-full"
            key={id}
          >
            <p className="font-semibold">{text}</p>
            <p className="text-right text-sm">{author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
