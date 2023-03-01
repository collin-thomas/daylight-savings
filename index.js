const clients = [
  {
    org: "Sunridge",
    name: "Kaitlyn",
    biweekly: true,
    datetime: "2023-03-27 3:00 MST",
    state: "AZ",
  },
  {
    org: "Test",
    name: "Test Peron",
    biweekly: true,
    datetime: "2023-03-27 5:00 EST",
  },
  {
    org: "Test",
    name: "Second Test Peron",
    biweekly: true,
    datetime: "2023-03-27 5:00 EST",
  },
];

const convertTimezone = (clients) => {
  const convertedClients = [];
  for (let index = 0; index < clients.length; index++) {
    const client = clients[index];
    if (client.state === "AZ") continue;
    client.datetime = client.datetime.replace("S", "D");
    convertedClients.push(client);
  }
  return convertedClients;
};

const findConflicts = (clients) => {
  const conflicts = [];
  clients.forEach((sourceClient, sourceIndex) => {
    const sourceClientDate = new Date(sourceClient.datetime);
    const sourceConflicts = clients
      // Remove sourceClient from comparison
      .filter((_, destIndex) => sourceIndex !== destIndex)
      // Find conflicts with sourceClient
      .filter((destClient) => {
        return (
          sourceClientDate.valueOf() === new Date(destClient.datetime).valueOf()
        );
      });
    for (let index = 0; index < sourceConflicts.length; index++) {
      const sourceConflict = sourceConflicts[index];
      const alreadyConflicts = conflicts.find(
        (conflict) => conflict.name === sourceConflict.name
      );
      if (alreadyConflicts) continue;
      conflicts.push({
        name: sourceClient.name,
        conflictsWith: sourceConflict.name,
      });
    }
  });
  return conflicts;
};

console.log({clients})
console.log({Standard: findConflicts(clients)});
console.log({Daylight: findConflicts(convertTimezone(clients))});

