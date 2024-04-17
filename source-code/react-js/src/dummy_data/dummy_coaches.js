export const DUMMY_COACHES = [{
        coachId: 1,
        coachName: "John Doe",
        coachEmail: "john.doe@example.com",
        coachExperience: "5 years",
        coachLevel: "Advanced",
        coachCategory: "Fitness",
        totalTrainedMembers: 50,
        coachContact: {
            website: "https://www.johndoe.com",
            facebook: "https://www.facebook.com/johndoe",
            twitter: "https://www.twitter.com/johndoe",
            instagram: "https://www.instagram.com/johndoe",
            linkedin: "https://www.linkedin.com/in/johndoe"
        }
    },
    {
        coachId: 2,
        coachName: "Jane Smith",
        coachEmail: "jane.smith@example.com",
        coachExperience: "3 years",
        coachLevel: "Intermediate",
        coachCategory: "Yoga",
        totalTrainedMembers: 30,
        coachContact: {
            website: "https://www.janesmithyoga.com",
            facebook: "https://www.facebook.com/janesmithyoga",
            twitter: "https://www.twitter.com/janesmithyoga",
            instagram: "https://www.instagram.com/janesmithyoga",
            linkedin: "https://www.linkedin.com/in/janesmithyoga"
        }
    },
];
export const filterCoaches = (coaches, selectedCoaches) => {
    console.log(selectedCoaches)
    return coaches.filter(coach => {
        const isCoachCategorySelected = Object.entries(selectedCoaches.coachCategory)
            .every(([coachCategory, isSelected]) => isSelected || coach.coachCategory.toLowerCase() !== coachCategory);
        const isCoachLevelSelected = Object.entries(selectedCoaches.coachLevel)
            .every(([coachLevel, isSelected]) => isSelected || coach.coachLevel.toLowerCase() !== coachLevel);

        return isCoachCategorySelected && isCoachLevelSelected;
    });
};