<template>
    <div class="resume" v-if="shouldDisplay">
        <resume-header :data="header"></resume-header>
        <resume-separator></resume-separator>

        <resume-experience :data="experience"></resume-experience>
        <resume-separator></resume-separator>

        <resume-education :data="education"></resume-education>
        <resume-separator></resume-separator>

        <resume-technical-skills :data="technicalSkills"></resume-technical-skills>
        <resume-separator></resume-separator>

        <resume-projects :data="projects"></resume-projects>
    </div>
</template>

<script>
import FontFaceObserver from "fontfaceobserver";
import ResumeHeader from "./components/ResumeHeader.vue";
import ResumeEducation from "./components/ResumeEducation.vue";
import ResumeExperience from "./components/ResumeExperience.vue";
import ResumeTechnicalSkills from "./components/ResumeTechnicalSkills.vue";
import ResumeProjects from "./components/ResumeProjects.vue";
import ResumeSeparator from "./components/ResumeSeparator.vue";

export default {
    components: {
        ResumeHeader,
        ResumeEducation,
        ResumeExperience,
        ResumeTechnicalSkills,
        ResumeProjects,
        ResumeSeparator,
    },

    beforeCreate() {
        const requiredFonts = [
            { name: "Computer Modern Serif", weight: "normal" },
            { name: "Computer Modern Serif", weight: "bold" },
        ];

        Promise.all(
            requiredFonts.map(({ name, weight }) =>
                new FontFaceObserver(name, { weight }).load(null, 2000)
            )
        )
            .then(() => {
                this.shouldDisplay = true;
            })
            .catch(() => {
                // in case something fails still show the page
                this.shouldDisplay = true;
            });
    },

    data() {
        return {
            shouldDisplay: false,
            header: {
                whoami: {
                    name: "Vladimir Kolmakov",
                    link: "/",
                    label: "Link to personal website",
                },
                contacts: [
                    {
                        iconKind: "icon-envelope",
                        iconClass: "icon-envelope",
                        text: "vkolmakov256@gmail.com",
                        link: "mailto:vkolmakov256@gmail.com",
                        label: "Email address",
                    },
                    {
                        iconKind: "icon-github",
                        iconClass: "icon-github",
                        text: "vkolmakov",
                        link: "https://github.com/vkolmakov",
                        label: "Github",
                    },
                    {
                        iconKind: "icon-linkedin-square",
                        iconClass: "icon-linkedin-square",
                        text: "vkolmakov",
                        link: "https://www.linkedin.com/in/vkolmakov/",
                        label: "LinkedIn",
                    },
                    {
                        iconKind: "icon-map-marker",
                        iconClass: "icon-map-marker",
                        text: "Chicago, IL",
                        link:
                            "https://www.google.com/maps/place/Chicago,+IL/@41.833648,-87.8722379,11z/data=!3m1!4b1!4m5!3m4!1s0x880e2c3cd0f4cbed:0xafe0a6ad09c0c000!8m2!3d41.8781136!4d-87.6297982",
                        label: "Location",
                    },
                ],
            },

            education: {
                schools: [
                    {
                        name: "Illinois Institute of Technology",
                        city: "Chicago, IL",
                        major: "Bachelor of Science: Computer Science",
                        graduation: "December 2017",
                        gpa: "3.84/4.00",
                    },
                ],
            },

            experience: {
                jobs: [
                    {
                        company: "Relativity",
                        city: "Chicago, IL",
                        positions: [
                            {
                                title: "Senior Software Engineer",
                                dates: "November 2020 - present",
                            },
                            {
                                title: "Advanced Software Engineer",
                                dates: "May 2019 - November 2020",
                            },
                        ],
                        bulletpoints: [
                            "Design and develop an extensible cloud-based automation framework that connects and automates processes across the Relativity platform. (Back-end: Azure Functions, Event Grid, Logic Apps, .NET Core, Kubernetes. Front-end: TypeScript, Aurelia, RxJS-based state management)",
                            "Help with onboarding for new team members by providing mentorship, leading training sessions and authoring development tools & onboarding documentation for several projects.",
                        ],
                    },
                    {
                        company: "Relativity",
                        city: "Chicago, IL",
                        positions: [
                            {
                                title: "Software Engineer",
                                dates: "December 2017 - May 2019",
                            },
                        ],
                        bulletpoints: [
                            "Designed and developed features for internal developer-focused front-end frameworks and npm packages (ES6, TypeScript, AngularJS and Aurelia)",
                            "Created reusable and accessible web components. (ES6, Preact)"
                        ],
                    },
                    {
                        company: "Relativity (formerly kCura)",
                        city: "Chicago, IL",
                        positions: [
                            {
                                title: "Software Engineering Intern",
                                dates: "June 2017 - December 2017",
                            },
                        ],
                        bulletpoints: [
                            "Improved developer experience by adding incremental builds and fully automating build process for the web component library, which resulted in average raw time savings of 92% per build.",
                            "Made a contribution to Choices.js open-source library with library accessibility improvements.",
                            "Contributed to multiple projects, including Preact-based web component library, Aurelia and AngularJS based applications.",
                        ],
                    },
                    {
                        company: "Target",
                        city: "Minneapolis, MN",
                        positions: [
                            {
                                title: "Software Engineering Intern",
                                dates: "June 2016 - August 2016",
                            },
                        ],
                        bulletpoints: [
                            "Worked with the Threat Detection Operations team at the Cyber Fusion Center on establishing Mac OSX forensics process.",
                            "Built an extensible Mac OSX forensics framework using multiple open-source tools.",
                            "Contributed to several internal projects.",
                        ],
                    },
                ],
            },

            technicalSkills: {
                languages: [
                    "JavaScript/Node.js",
                    "TypeScript",
                    "Python",
                    "Elm",
                    "Scala",
                    "C#",
                    "F#",
                    "Haskell",
                    "Java",
                    "C",
                ],
                technologies: [
                    "React",
                    "Redux",
                    "AngularJS",
                    "Vue.js",
                    "Express",
                    "Django",
                    ".NET",
                    "PostgreSQL",
                    "MongoDB",
                    "redis",
                    "Elasticsearch",
                    "Kibana",
                    "ReactiveX",
                    "Webpack",
                    "Rollup",
                    "HTML5",
                    "CSS3",
                    "Sass",
                    "jQuery",
                ],
                tools: ["Git", "Docker", "Kubernetes"],
            },

            projects: {
                projects: [
                    {
                        name: "Math Emporium",
                        bulletpoints: [
                            "Self-service web application that allows students to log in using their school email address and schedule tutoring appointments directly at Math Emporium's calendar.",
                            "Backend: Node.js, Express, PostgreSQL, MongoDB. Frontend: React + Redux, Elm, Sass.",
                            'Source: <a href="https://github.com/vkolmakov/math-emporium">github.com/vkolmakov/math-emporium</a>. Link: <a href="https://tutoringatwright.com">tutoringatwright.com</a>.',
                        ],
                    },
                    {
                        name: "Face Recognition Attendance System",
                        bulletpoints: [
                            "Web application designed to seamlessly maintain attendance at schools using face recognition.",
                            "Built with Vue.js, RxJS and OpenFace.",
                            'Source: <a href="https://github.com/vkolmakov/Facial-Recognition-Attendance">github.com/vkolmakov/Facial-Recognition-Attendance</a>.',
                        ],
                    },
                ],
            },
        };
    },
};
</script>

<style lang="scss">
@import "./ComputerModern/cmun-serif.css";
@import "./mixins";

.resume {
    max-width: 50em;

    padding: 1em;
    margin: 0 auto;

    background: #fff;
    color: #333;
    font-family: "Computer Modern Serif", serif;

    h1 {
        margin: 0.1em 0;
    }

    h2 {
        @include header;
    }

    @include breakpoint-large-screen {
        padding: 3.5em 6em;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 4px #aaa;
    }
}

.resume a {
    text-decoration: none;
    color: #111;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

@media print {
    .resume {
        font-size: 12px;
        border: 0;
        margin: 0 auto;
        margin-top: -20px;

        color: #111;
        background-color: #fff;
        box-shadow: none;
    }
}
</style>
