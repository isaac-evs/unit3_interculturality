import React, { useState } from "react";

const HofstedeCulturalDimensions = () => {
  // Define the cultural dimensions with everyday examples
  const dimensions = [
    {
      name: "Power Distance",
      high: "High Power Distance",
      low: "Low Power Distance",
      color: "blue",
      definition:
        "The extent to which less powerful members of institutions and organizations within a country expect and accept that power is distributed unequally.",
      examples: [
        {
          context: "Workplace",
          high: "Employees wait for explicit instructions from managers before taking action.",
          low: "Employees feel comfortable challenging their boss's ideas in meetings.",
        },
        {
          context: "Family",
          high: "Children are expected to obey parents without question.",
          low: "Parents encourage children to participate in family decisions.",
        },
        {
          context: "Education",
          high: "Students stand when the professor enters and only speak when called upon.",
          low: "Students address professors by first name and freely contribute to discussions.",
        },
      ],
    },
    {
      name: "Individualism vs. Collectivism",
      high: "Individualism",
      low: "Collectivism",
      color: "purple",
      definition:
        "The degree to which individuals are integrated into groups. Individualism emphasizes personal achievement and individual rights, while collectivism emphasizes group harmony and loyalty.",
      examples: [
        {
          context: "Housing",
          high: "Young adults move out as soon as they can afford their own place.",
          low: "Multiple generations live together in the same household.",
        },
        {
          context: "Career",
          high: "Frequently changing jobs to advance personal career goals.",
          low: "Staying loyal to one company for entire career, even if better opportunities exist elsewhere.",
        },
        {
          context: "Success",
          high: "Personal achievements and individual recognition are celebrated.",
          low: "Group harmony and collective accomplishments are valued above personal success.",
        },
      ],
    },
    {
      name: "Masculinity vs. Femininity",
      high: "Masculinity",
      low: "Femininity",
      color: "green",
      definition:
        "The distribution of emotional roles between genders. Masculinity is associated with assertiveness, competition, and achievement, while femininity is associated with modesty, cooperation, and quality of life.",
      examples: [
        {
          context: "Work-Life Balance",
          high: "Working overtime to get ahead is admired and expected.",
          low: "Leaving work on time to spend time with family is respected and encouraged.",
        },
        {
          context: "School",
          high: "Being the best student is extremely important; competition is intense.",
          low: "Being average is acceptable; cooperation and social skills are emphasized.",
        },
        {
          context: "Conflict Resolution",
          high: "Conflicts are resolved through competition and assertiveness.",
          low: "Conflicts are resolved through compromise and negotiation.",
        },
      ],
    },
    {
      name: "Uncertainty Avoidance",
      high: "High Uncertainty Avoidance",
      low: "Low Uncertainty Avoidance",
      color: "amber",
      definition:
        "A society's tolerance for ambiguity. It reflects the extent to which members of a society attempt to cope with anxiety by minimizing uncertainty.",
      examples: [
        {
          context: "Planning",
          high: "Detailed agendas and schedules for social gatherings.",
          low: "Spontaneous meetups with flexible or no specific plans.",
        },
        {
          context: "Rules",
          high: "Detailed instructions for using everyday products.",
          low: "Figuring things out by trial and error is expected and enjoyed.",
        },
        {
          context: "Careers",
          high: "Choosing stable careers with clear progression paths.",
          low: "Being comfortable with changing careers or working in emerging fields.",
        },
      ],
    },
    {
      name: "Long-Term vs. Short-Term",
      high: "Long-Term Orientation",
      low: "Short-Term Orientation",
      color: "pink",
      definition:
        "The connection of the past with the current and future actions/challenges. A long-term orientation encourages thrift and perseverance, while a short-term orientation emphasizes immediate gratification.",
      examples: [
        {
          context: "Financial",
          high: "Saving a significant portion of income for future needs.",
          low: "Spending money to enjoy the present moment.",
        },
        {
          context: "Education",
          high: "Studying for years to develop skills that will be useful long-term.",
          low: "Focusing on subjects that have immediate practical applications.",
        },
        {
          context: "Business",
          high: "Companies investing in long-term research with no immediate returns.",
          low: "Focusing on quarterly profits and short-term results.",
        },
      ],
    },
    {
      name: "Indulgence vs. Restraint",
      high: "Indulgence",
      low: "Restraint",
      color: "orange",
      definition:
        "The extent to which people try to control their desires and impulses. Indulgence allows relatively free gratification of basic human drives related to enjoying life, while restraint suppresses gratification through strict social norms.",
      examples: [
        {
          context: "Leisure",
          high: "Regular social gatherings, parties, and recreational activities.",
          low: "Leisure time is limited and governed by strict social norms.",
        },
        {
          context: "Food",
          high: "Eating out frequently and enjoying diverse culinary experiences.",
          low: "Eating viewed primarily as necessary nutrition rather than pleasure.",
        },
        {
          context: "Expression",
          high: "Freely expressing emotions and opinions in public.",
          low: "Controlling emotional expressions and maintaining a reserved demeanor.",
        },
      ],
    },
  ];

  const [selectedDimension, setSelectedDimension] = useState(dimensions[0]);
  const [isChanging, setIsChanging] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleDimensionChange = (dim) => {
    if (selectedDimension.name !== dim.name) {
      setIsChanging(true);
      setShowExamples(false);
      setTimeout(() => {
        setSelectedDimension(dim);
        setIsChanging(false);
        setTimeout(() => {
          setShowExamples(true);
        }, 300);
      }, 300);
    }
  };

  // Generate gradient classes based on dimension color
  const getGradient = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      amber: "from-amber-500 to-amber-600",
      pink: "from-pink-500 to-pink-600",
      orange: "from-orange-500 to-orange-600",
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
  };

  // Get specific colors for the current dimension
  const currentGradient = getGradient(selectedDimension.color);
  const currentLightBg = `bg-${selectedDimension.color}-50`;
  const currentDarkColor = `text-${selectedDimension.color}-800`;
  const currentBorderColor = `border-${selectedDimension.color}-200`;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg max-w-4xl mx-auto min-h-screen">
      <div
        className={`text-center transition-all duration-500 transform ${isChanging ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
      >
        <h1 className="text-3xl font-bold mb-1">
          Hofstede's Cultural Dimensions
        </h1>
        <p className="text-gray-600 mb-6">
          Translating theory into everyday life scenarios
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {dimensions.map((dim) => (
          <button
            key={dim.name}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
              selectedDimension.name === dim.name
                ? `bg-gradient-to-r ${getGradient(dim.color)} text-white transform scale-110`
                : "bg-white hover:bg-gray-50 text-gray-700 hover:scale-105"
            }`}
            onClick={() => handleDimensionChange(dim)}
          >
            {dim.name}
          </button>
        ))}
      </div>

      <div
        className={`bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 transition-all duration-500 transform ${isChanging ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"} border-${selectedDimension.color}-500`}
      >
        <h2
          className={`text-2xl font-bold mb-3 text-${selectedDimension.color}-600`}
        >
          {selectedDimension.name}
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          {selectedDimension.definition}
        </p>

        <div className="flex justify-between items-center mb-2 relative h-12">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-${selectedDimension.color}-100 to-${selectedDimension.color}-200 rounded-lg opacity-30`}
          ></div>
          <span
            className={`font-semibold text-${selectedDimension.color}-800 relative z-10 p-3`}
          >
            {selectedDimension.low}
          </span>
          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center shadow-inner">
            <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
          </div>
          <span
            className={`font-semibold text-${selectedDimension.color}-800 relative z-10 p-3`}
          >
            {selectedDimension.high}
          </span>
        </div>
      </div>

      <div
        className={`transition-all duration-500 transform ${showExamples ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <h3 className="text-xl font-semibold mb-4">Real-Life Examples</h3>

        <div className="space-y-4">
          {selectedDimension.examples.map((example, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden border transition-all duration-300 transform hover:shadow-lg hover:scale-102 border-${selectedDimension.color}-200`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`px-4 py-3 font-medium bg-gradient-to-r ${currentGradient} text-white`}
              >
                {example.context}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                <div
                  className={`p-4 hover:bg-${selectedDimension.color}-50 transition-colors duration-300`}
                >
                  <h4
                    className={`font-semibold ${currentDarkColor} mb-2 flex items-center`}
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs">
                      L
                    </span>
                    {selectedDimension.low}
                  </h4>
                  <p>{example.low}</p>
                </div>
                <div
                  className={`p-4 hover:bg-${selectedDimension.color}-50 transition-colors duration-300`}
                >
                  <h4
                    className={`font-semibold ${currentDarkColor} mb-2 flex items-center`}
                  >
                    <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">
                      H
                    </span>
                    {selectedDimension.high}
                  </h4>
                  <p>{example.high}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HofstedeCulturalDimensions;
