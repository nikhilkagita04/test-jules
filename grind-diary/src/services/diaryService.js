let entries = [];
let nextId = 1;

export const createDiaryEntry = async (entryData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  const newEntry = {
    id: nextId++,
    timestamp: new Date().toISOString(),
    ...entryData,
  };
  entries.push(newEntry);
  console.log('Diary entries after creation:', entries);
  return newEntry;
};

export const getDiaryEntries = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log('Returning diary entries:', entries);
  return [...entries]; // Return a copy
};
