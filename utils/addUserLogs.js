export const addUserLogs = (user, date, task) => {
  let index = user.logs.findIndex((l) => l.date.toString().split("T")[0] == date.split("T")[0]);

  if (index == -1) {
    user.logs.push({
      date: date,
      activities: [],
    });

    index = user.logs.findIndex((l) => l.date.toString() == date);
  }
  user.logs[index].activities.push({
    time: date.split("T")[1],
    task: task,
  });
};
