export const addProjectFormData = {
  header: {
    title: "Add New Project",
    description: "Create and publish a detailed DAFA project.",
  },

  sections: {
    overview: {
      title: "Project Overview",
      description: "Basic information about the project.",
    },

    location: {
      title: "Location & Timeline",
      description: "Project location and implementation period.",
    },

    team: {
      title: "Project Team",
      description: "People behind the project.",
    },

    objectives: {
      title: "Project Objectives",
      description: "What the project aims to achieve.",
    },

    activities: {
      title: "Project Activities",
      description: "What the project includes.",
    },

    media: {
      title: "Project Media",
      description: "Upload donor, partner, and project images.",
    },
  },

  fields: {
    donorLogo: {
      label: "Donor Logo",
      description: "Upload the donor organization logo.",
      accept: "image/png,image/jpeg,image/webp",
    },

    implementationPartnerLogo: {
      label: "Implementation Partner Logo",
      description: "Upload the implementation partner logo.",
      accept: "image/png,image/jpeg,image/webp",
    },

    projectImages: {
      label: "Project Images",
      description: "Upload project photos. You can select multiple images.",
      accept: "image/png,image/jpeg,image/webp",
    },

    name: {
      label: "Project Name",
      placeholder: "Enter project name",
    },

    description: {
      label: "Project Description",
      placeholder: "Describe the project...",
    },

    donor: {
      label: "Donor",
      placeholder: "e.g. UNMAS",
    },

    implementationPartner: {
      label: "Implementation Partner",
      placeholder: "e.g. DAFA",
    },

    province: {
      label: "Province",
      placeholder: "e.g. Nangarhar",
    },

    location: {
      label: "Location",
      placeholder: "e.g. Nangarhar Province",
    },

    startDate: {
      label: "Start Date",
    },

    endDate: {
      label: "End Date",
    },

    status: {
      label: "Project Status",
      options: ["Planning", "Active", "Completed"],
    },

    country: {
      label: "Country",
      defaultValue: "Afghanistan",
    },

    team: {
      total: {
        label: "Total Team",
        placeholder: "35",
      },

      fieldStaff: {
        label: "Field Staff",
        placeholder: "25",
      },

      supervisors: {
        label: "Supervisors",
        placeholder: "4",
      },

      technicalStaff: {
        label: "Technical Staff",
        placeholder: "6",
      },
    },

    objective: {
      placeholder: "Enter project objective",
    },

    activity: {
      titlePlaceholder: "Activity title e.g. Risk Education Sessions",
      descriptionPlaceholder: "Describe this activity...",
    },
  },

  buttons: {
    addObjective: "Add Objective",
    addActivity: "Add Activity",
    cancel: "Cancel",
    submit: "Add Project",
    remove: "Remove",
    close: "Close",
    chooseImage: "Choose Image",
    changeImage: "Change Image",
    uploadImages: "Upload Project Images",
  },

  defaultValues: {
    status: "Planning",
    country: "Afghanistan",

    donorLogo: null,
    implementationPartnerLogo: null,
    projectImages: [],

    objectives: [""],

    activities: [
      {
        title: "",
        description: "",
      },
    ],

    team: {
      total: "",
      fieldStaff: "",
      supervisors: "",
      technicalStaff: "",
    },
  },
};
