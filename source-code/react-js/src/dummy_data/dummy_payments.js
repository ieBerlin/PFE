const currentDate = (date, offset = 0) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - offset);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
export const DUMMY_DATES = [{
        id: 1,
        time: "Today", // Current date
    },
    {
        id: 2,
        time: currentDate(new Date(), 1), // Subtract 1 day
    },
    {
        id: 3,
        time: currentDate(new Date(), 2), // Subtract 2 days
    },
    {
        id: 4,
        time: currentDate(new Date(), 3), // Subtract 3 days
    },
];