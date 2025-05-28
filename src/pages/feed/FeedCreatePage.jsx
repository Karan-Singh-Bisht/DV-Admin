import React, { useState } from "react";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeed } from "../../state/Feed/feedSlice";

const categorySubcategoryMap = {
  "🛠️ Any Thing": [
    "🧩 Miscellaneous",
    "🔍 General Inquiry",
    "🇮🇳 Local News",
    "🌍 World News",
  ],
  "🏆 Awards": [
    "🎬 Film fare",
    "🏅 Padma",
    "🎥 National Film",
    "🏆 Arjuna",
    "📚 Sahitya Akademi",
    "🎬 Oscars",
    "🏅 Nobel Prize",
    "🎤 Grammy",
    "🎥 BAFTA",
    "📚 Pulitzer Prize",
  ],
  "🕴🏻 Business": [
    "📈 Stock Market",
    "🚀 Startups",
    "🏦 Banking",
    "🏘️ Real Estate",
    "🧾 Taxation",
    "🌐 Global Markets",
    "💰 Cryptocurrency",
    "🌍 International Trade",
    "📊 Investment Strategies",
    "🏢 Corporate News",
  ],
  "💼 Careers": [
    "🏛️ Government Jobs",
    "💻 IT Sector",
    "🎓 Teaching",
    "🏥 Healthcare",
    "🌟 Freelancing",
    "🌏 Remote Work",
    "🛠️ Engineering",
    "🏦 Finance & Banking",
    "🎨 Creative Industries",
    "💼 Consulting",
  ],
  "😄 Casual & Humour": [
    "😂 Memes",
    "📱 Funny Jokes",
    "🎙️ Indian Stand-up Comedy",
    "😜 Daily Life Humour",
    "🧡 Regional Fun",
    "😂 Internet Memes",
    "🎙️ Stand-up Comedy",
    "🌙 Late Night Shows",
    "📺 Sitcoms",
    "📱 Social Media Trends",
  ],
  "🌦️ Climate": [
    "🌧️ Monsoons",
    "🚯 Pollution Control",
    "🌞 Renewable Energy",
    "💧 Water Conservation",
    "🌳 Forest Conservation",
    "🌍 Climate Change",
    "🌿 Green Technologies",
    "🌡️ Global Warming",
    "♻️ Sustainable Living",
    "🌪️ Natural Disasters",
  ],
  "🦸🏻 Comics": [
    "🎬 Bollywood Movies",
    "🎬 Tollywood Movies",
    "🎥 Regional Cinema",
    "🎥 Pan India Cinema",
    "📚 Indian Comics",
    "📝 Film Reviews",
    "🌟 Celebrity News",
    "🎬 Hollywood Movies",
    "📚 Anime & Manga",
    "🦸‍♂️ Marvel & DC Comics",
    "🎥 International Cinema",
    "📝 Movie Reviews",
  ],
  "👨🏻‍💻 Coding": [
    "🌐 Web Development",
    "📱 App Development",
    "📊 Data Science",
    "🤖 AI & Machine Learning",
    "🏅 Competitive Programming",
    "💻 Open Source Projects",
    "🔒 Cybersecurity",
    "⛓️ Blockchain Development",
    "⚙️ DevOps",
    "👨‍💻 Software Engineering",
  ],
  "👨🏻‍🍳 Cooking": [
    "🍛 Indian Cuisine",
    "🍲 Street Food",
    "🥗 Healthy Recipes",
    "🎉 Festive Dishes",
    "🍴 Regional Specialties",
    "🍝 Italian Cuisine",
    "🍰 Baking",
    "🌱 Vegan Recipes",
    "🍖 BBQ & Grilling",
    "🌍 World Cuisines",
  ],
  "💃🏻 Dance": [
    "💃 Classical",
    "🕺 Bollywood",
    "🕺 Tollywood",
    "🎶 Folk",
    "🩰 Contemporary",
    "🏆 Competitions",
    "🩰 Ballet",
    "🕺 Hip-Hop",
    "💃 Salsa",
    "🌟 Modern",
    "🎶 Shows",
  ],
  "📊 Economics": [
    "🇮🇳 Economy",
    "🧾 GST & Taxes",
    "🌾 Rural Development",
    "📜 Financial Policies",
    "💼 Economic Reforms",
    "🌍 Economy",
    "📜 Trade Policies",
    "📉 Inflation & Deflation",
    "📊 Economic Theories",
    "🌐 International Economics",
  ],
  "🎓 Education": [
    "🎓 Higher",
    "💻 Online Learning",
    "🏫 School",
    "🎓 Scholarships",
    "📚 Educational Reforms",
    "🏛️ International Universities",
    "💻 Online Courses",
    "📱 Educational Technology",
    "🌏 Study Abroad",
    "🔬 Research Opportunities",
  ],
  "🎭 Entertainment": [
    "🎬 Bollywood",
    "🎬 Tollywood",
    "📺 Indian TV Shows",
    "🌟 Celebrity News",
    "🎤 Music Festivals",
    "📺 OTT Platforms",
    "🎬 Hollywood",
    "🎵 Global Music",
    "📺 TV Series",
    "🌟 Celebrity Gossip",
    "📺 Streaming Services",
  ],
  "🎉 Events": [
    "🎉 Festivals",
    "💍 Weddings",
    "🗣️ Conferences",
    "🏅 Sports",
    "🎭 Cultural",
    "🎵 Music Festivals",
    "🌏 International Conferences",
    "⚽ Sporting Events",
    "🎡 Expos & Fairs",
    "🎊 Public Holidays",
  ],
  "👗 Fashion": [
    "👗 Traditional Wear",
    "🌟 Bollywood Fashion",
    "🌟 Tollywood Fashion",
    "🛍️ Fashion Weeks",
    "👰 Bridal Fashion",
    "🧢 Street Style",
    "👗 Haute Couture",
    "🛍️ Fashion Shows",
    "🌿 Sustainable Fashion",
    "👠 Designer Brands",
    "🌍 Global Trends",
  ],
  "🏦 Finance": [
    "📈 Stock Market",
    "🚀 Startups",
    "🏦 Banking",
    "🏘️ Real Estate",
    "🧾 Taxation",
    "🌐 Global Markets",
    "💰 Cryptocurrency",
    "🌍 International Trade",
    "📊 Investment Strategies",
    "🏢 Corporate News",
  ],
  "🏋🏻 Fitness": [
    "🧘‍♀️ Yoga",
    "🏋️ Gym Workouts",
    "🏃 Running & Jogging",
    "🏠 Home Workouts",
    "🥗 Nutrition & Diet",
    "🏋️ CrossFit",
    "🧘‍♀️ Pilates",
    "🏃 Marathons",
    "💪 HIIT Workouts",
    "🥙 Sports Nutrition",
  ],
  "🍔 Food": [
    "🍲 Street Food",
    "🍨 Desserts",
    "🥗 Vegetarian Dishes",
    "🌶️ Indian Spices",
    "🍛 Regional Cuisines",
    "🍽️ Gourmet Cuisine",
    "🍔 Fast Food",
    "🍰 Desserts",
    "🌍 World Cuisines",
    "🥗 Healthy Eating",
  ],
  "🔧 Gadgets": [
    "📱 Smartphones",
    "⌚ Wearables",
    "🏠 Home Appliances",
    "📝 Tech Reviews",
    "📟 Latest Gadgets",
    "💻 Laptops",
    "🎮 Gaming Consoles",
    "🏡 Smart Home Devices",
    "🔬 Innovative Tech",
    "🌐 Global Gadget Trends",
  ],
  "🎮 Games": [
    "🎮 Video Games",
    "🎲 Traditional Games",
    "🎮 E-Sports",
    "🎲 Board Games",
    "🎮 Popular Video Games",
  ],
  "📍 Geo Location": [
    "🏙️ Major Cities",
    "🗺️ Tourist Attractions",
    "🏛️ Historical Sites",
    "🌄 Natural Wonders",
    "🗺️ Regional Maps",
    "🌍 Continents",
    "🏛️ World Capitals",
    "🗽 Famous Landmarks",
    "🏰 UNESCO Sites",
    "🌏 Travel Guides",
  ],
  "🧘🏻 Health & Well being": [
    "🌿 Ayurveda",
    "🏥 Public Health",
    "🧠 Mental Health",
    "🥗 Nutrition & Diet",
    "🧘‍♀️ Yoga & Meditation",
    "💉 Healthcare Innovations",
    "🌍 Global Health Trends",
    "🧠 Mental Wellness",
    "🏃‍♂️ Fitness & Exercise",
    "🍎 Healthy Living",
  ],
  "⛑️ Helpers": [
    "🧹 Domestic Helpers",
    "🛠️ Local Services",
    "🏥 Medical Assistance",
    "📚 Educational Tutors",
    "🚑 Emergency Services",
    "🏠 Home Services",
    "💼 Professional Helpers",
    "🩺 Healthcare Assistance",
    "📖 Online Tutors",
    "👥 Community Support Groups",
  ],
  "ℹ️ Information": [
    "📰 News Updates",
    "📜 Government Policies",
    "🗓️ Local Events",
    "📚 Educational Resources",
    "🎭 Cultural Insights",
    "🌍 Global News",
    "📱 Technological Updates",
    "🌐 International Policies",
    "📖 Research Articles",
    "🧳 Travel Information",
  ],
  "🌿 Nature": [
    "🐅 Wildlife Sanctuaries",
    "🌳 National Parks",
    "🌺 Botanical Gardens",
    "🌿 Eco-tourism",
    "🌱 Conservation Efforts",
    "🌍 Natural Wonders",
    "🐘 Wildlife Conservation",
    "🏞️ National Parks & Reserves",
    "🌎 Environmental Issues",
    "📸 Nature Photography",
  ],
  "📰 News": [
    "📰 National News",
    "🌐 Regional News",
    "🗳️ Political Updates",
    "💼 Business News",
    "🏅 Sports News",
    "🌍 International News",
    "📱 Tech News",
    "🌿 Environmental News",
    "📊 Economic News",
    "🩺 Health News",
  ],
  "🪪 Networking": [
    "👔 Professional Networks",
    "📱 Social Media Platforms",
    "💼 Business Networking",
    "🏘️ Local Communities",
    "📚 Educational Networks",
    "🌐 LinkedIn Professional Network",
    "📱 Social Media Platforms",
    "🌏 International Conferences",
    "💼 Business Forums",
    "🌟 Online Communities",
  ],
  "🎬 Movies": [
    "🎬 Bollywood Movies",
    "🎬 Tollywood Movies",
    "🎥 Regional Cinema",
    "🎥 Pan India Cinema",
    "📚 Indian Comics",
    "📝 Film Reviews",
    "🌟 Celebrity News",
    "🎬 Hollywood Movies",
    "📚 Anime & Manga",
    "🦸‍♂️ Marvel & DC Comics",
    "🎥 International Cinema",
    "📝 Movie Reviews",
  ],
  "🎵 Music": [
    "🎵 Bollywood Music",
    "🎵 Tollywood Music",
    "🎻 Classical Music",
    "🎶 Folk Music",
    "🎤 Music Festivals",
    "🎤 Playback Singing",
    "🎵 Pop Music",
    "🎸 Rock & Metal",
    "🎻 Classical Music",
    "🎤 Global Music Festivals",
    "🎤 Singing Competitions",
  ],
  "📷 Photography": [
    "📸 Wildlife Photography",
    "🌄 Landscape Photography",
    "🏙️ Street Photography",
    "📷 Portrait Photography",
    "🎉 Event Photography",
    "🌍 Travel Photography",
    "👗 Fashion Photography",
    "🏛️ Architectural Photography",
    "🖤 Black & White Photography",
    "🚁 Aerial Photography",
  ],
  "🎙️ Podcasts": [
    "🎬 Bollywood Podcasts",
    "🎙️ History & Culture",
    "💼 Business & Startups",
    "📚 Educational Podcasts",
    "🔬 Technology & Science",
    "🕵️‍♂️ True Crime Podcasts",
    "😂 Comedy Shows",
    "🌍 Global News",
    "🌟 Self-help & Motivation",
    "🚀 Tech & Innovation",
  ],
  "🏛️ Politics": [
    "🏛️ Indian Parliament",
    "🗳️ State Politics",
    "🎭 Political Parties",
    "🗳️ Election Updates",
    "📜 Policy Discussions",
    "🌍 International Relations",
    "🌐 Global Leaders",
    "📚 Political Theories",
    "🗳️ Election Coverage",
    "🗣️ Policy Debates",
  ],
  "🛍️ Shopping": [
    "🛒 Local Markets",
    "🛍️ Online Shopping",
    "🎉 Festive Sales",
    "👗 Fashion Boutiques",
    "📱 Electronics Stores",
    "🌐 E-commerce Giants",
    "👠 International Brands",
    "💸 Seasonal Sales",
    "🛍️ Luxury Shopping",
    "📱 Tech Gadgets Stores",
  ],
  "🎤 Singing": [
    "🎵 Bollywood Music",
    "🎵 Tollywood Music",
    "🎻 Classical Music",
    "🎶 Folk Music",
    "🎤 Music Festivals",
    "🎤 Playback Singing",
    "🎵 Pop Music",
    "🎸 Rock & Metal",
    "🎻 Classical Music",
    "🎤 Global Music Festivals",
    "🎤 Singing Competitions",
  ],
  "🌠 Space": [
    "🚀 ISRO Missions",
    "🔭 Astronomy",
    "🌌 Space Research",
    "🛰️ Satellite Technology",
    "🌠 Space Exploration",
    "🚀 NASA Missions",
    "🌌 International Space Station",
    "🛰️ SpaceX & Private Spaceflight",
    "👽 Astrobiology",
    "🔭 Space Telescopes",
  ],
  "🚀 Startups": [
    "🦄 Unicorn Startups",
    "💰 Funding & Investments",
    "💰 Grants",
    "💻 Tech Startups",
    "🚀 Innovation Hubs",
    "🌟 Entrepreneurial Stories",
    "🌉 Silicon Valley Startups",
    "🌍 Global Innovations",
    "💸 Venture Capital",
    "🌐 Startup Ecosystems",
    "🌟 Success Stories",
  ],
  "🔯 Spirituality": [
    "🧘‍♂️ Yoga & Meditation",
    "📿 Hindu Philosophy",
    "🙏 Spiritual Gurus",
    "🕉️ Religious Practices",
    "🚶‍♂️ Pilgrimages",
    "🌼 Mindfulness",
    "🕊️ World Religions",
    "🌲 Spiritual Retreats",
    "🧘‍♀️ Meditation Techniques",
    "🌟 Self-discovery",
  ],
  "⚽ Sports": [
    "🏏 Cricket",
    "🤾‍♂️ Kabaddi",
    "🏒 Hockey",
    "⚽ Football",
    "🏃 Athletics",
    "⚽ Football",
    "🏀 Basketball",
    "🎾 Tennis",
    "🏉 Rugby",
    "🏂 Winter Sports",
    "🏆 Indian Premier League",
    "🥇 Olympic Sports",
    "🏅 ICC Cricket T20 Asia Cup",
    "🏆 ICC Cricket World Cup",
  ],
  "🤝🏻 Support": [
    "📞 Mental Health Helplines",
    "📚 Educational Support",
    "👫 Community Help Groups",
    "🆘 Disaster Relief",
    "💵 Financial Assistance",
    "📞 Crisis Helplines",
    "💻 Online Counselling",
    "👥 Support Communities",
    "🚨 Emergency Aid",
    "❤️ Non-profit Organisations",
  ],
  "💻 Technology": [
    "💻 IT Innovations",
    "🚀 Indian Startups",
    "📱 Mobile Technology",
    "🤖 AI & Robotics",
    "📰 Tech News",
    "🌐 Emerging Tech",
    "🌐 Internet of Things",
    "🔒 Cybersecurity",
    "🛰️ Space Technology",
    "📰 Global Tech News",
  ],
  "📈 Trending": [
    "🌍 Global Trends",
    "📱 Social Media Trends",
    "🌟 Popular Topics",
    "📊 Viral Content",
    "🔥 Hot Topics",
  ],
  "✈️ Travels": [
    "🏞️ Hill Stations",
    "🏛️ Historical Sites",
    "🏖️ Beaches",
    "🏕️ Adventure Travel",
    "🎭 Cultural Tours",
    "🇪🇺 Europe Tours",
    "🏔️ Adventure Travel",
    "🌴 Tropical Getaways",
    "🌍 Cultural Experiences",
    "🎒 Backpacking Destinations",
  ],
  "🚗 Vehicles": [
    "🏍️ Motorbikes",
    "🚗 Cars",
    "🚌 Public Transport",
    "🔌 Electric Vehicles",
    "🚘 Auto Expos",
    "🚙 Luxury Cars",
    "⚡ Electric Cars",
    "🚗 Motor Shows",
    "🚉 Public Transportation",
    "🚀 Innovative Vehicles",
  ],
  "✍🏻 Writings": [
    "📚 Literature",
    "✒️ Poetry",
    "📝 Blogging",
    "🎬 Scriptwriting",
    "📖 Academic Writing",
    "📖 Novels",
    "📰 Journalism",
    "🌐 Blogging",
    "🎥 Screenwriting",
    "🖋️ Creative Writing",
  ],
  "🔠 Other": [
    "🧩 Miscellaneous",
    "🎨 Hobbies",
    "🌆 Local Interest",
    "🌍 Global Trends",
    "🌟 Personal Development",
  ],
  "💡 Suggest": [
    "🧩 Miscellaneous",
    "🔍 General Inquiry",
    "🌟 Personal Development",
  ],
};

const FeedCreatePage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [url, setUrl] = useState("");
  const { loading } = useSelector((state) => state.feed);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [feedData, setFeedData] = useState({
    mediaUrl: [],
    description: "",
    platform: "",
    usernameOrName: "",
    location: "",
    categories: "",
    subCategories: [],
  });

  const handleSubmit = async () => {
    const formData = new FormData();

    feedData.mediaUrl.forEach((file) => {
      formData.append("mediaUrl", file);
    });

    formData.append("description", feedData.description);
    formData.append("platform", feedData.platform);
    formData.append("usernameOrName", feedData.usernameOrName);
    formData.append("location", feedData.location);
    formData.append("categories", feedData.categories);

    // Convert array to comma-separated string or send as JSON string
    formData.append("subCategories", JSON.stringify(feedData.subCategories));

    const response = await dispatch(createFeed(formData));
    if (response.meta.requestStatus === "fulfilled") {
      setFeedData({
        mediaUrl: [],
        description: "",
        platform: "",
        usernameOrName: "",
        location: "",
        categories: "",
        subCategories: [],
      });
    }
  };

  const handlePlatformClick = (name) => {
    setFeedData((prev) => ({ ...prev, platform: name }));
  };

  const removeSubcategory = (subcategory) => {
    setFeedData((prev) => ({
      ...prev,
      subCategories: prev.subCategories.filter((sub) => sub !== subcategory),
    }));
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - feedData.mediaUrl.length;

    if (files.length > remainingSlots) {
      alert("You can only upload up to 5 media files in total.");
      return;
    }

    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    setFeedData((prev) => ({
      ...prev,
      mediaUrl: [...prev.mediaUrl, ...validFiles],
    }));
  };

  // const handleURLChange = async (e) => {
  //   const inputUrl = e.target.value;
  //   setUrl(inputUrl);
  //   setImagePreview(""); // reset on new input
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categories") {
      setFeedData((prev) => ({
        ...prev,
        [name]: value,
        subCategories: [],
      }));
    } else if (name === "subCategories") {
      setFeedData((prev) => ({
        ...prev,
        [name]: prev.subCategories.includes(value)
          ? prev.subCategories.filter((sub) => sub !== value)
          : [...prev.subCategories, value],
      }));
    } else {
      setFeedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const availableSubcategories = feedData.categories
    ? categorySubcategoryMap[feedData.categories] || []
    : [];

  return (
    <div className="flex w-full h-[47vw] justify-center items-center p-4">
      <div
        className={`w-full h-full max-w-8xl flex flex-col bg-white rounded-2xl shadow-md p-8 space-y-6 `}
      >
        {/* Back Button */}
        <button className="text-2xl mb-2" onClick={() => navigate(-1)}>
          <IoMdArrowBack />
        </button>
        {/* URL Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter URL"
            // value={url}
            // onChange={handleURLChange}
            className="flex-grow p-3 border rounded"
          />
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
        <div className="flex justify-center items-center w-full h-full gap-4">
          <div className="flex-1 flex-col gap-2">
            <div
              onClick={handleAreaClick}
              className="w-full h-[30vw] border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {feedData.mediaUrl.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? feedData.mediaUrl.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-200"
                  >
                    ←
                  </button>

                  {feedData.mediaUrl[currentImageIndex].type.startsWith(
                    "image/"
                  ) ? (
                    <img
                      src={URL.createObjectURL(
                        feedData.mediaUrl[currentImageIndex]
                      )}
                      alt={`Media ${currentImageIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(
                        feedData.mediaUrl[currentImageIndex]
                      )}
                      className="max-h-full max-w-full object-contain"
                      muted
                      controls={false}
                      autoPlay={false}
                      onLoadedMetadata={(e) => e.target.pause()} // pause immediately on load
                    />
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === feedData.mediaUrl.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-200"
                  >
                    →
                  </button>
                </div>
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaChange}
              accept="image/*,video/*"
              multiple
              className="hidden"
            />
          </div>

          <div className="flex-1 gap-4 flex flex-col justify-center h-full ">
            {/* Platform Name */}
            <input
              name="platform"
              type="text"
              placeholder="Platform"
              value={feedData.platform}
              onChange={handleChange}
              readOnly
              className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
            />

            {/* Platform Icons */}
            <div className="flex flex-wrap justify-evenly items-center gap-4">
              <span
                onClick={() => handlePlatformClick("DV")}
                className="font-medium cursor-pointer"
              >
                DV
              </span>
              <FaLinkedin
                onClick={() => handlePlatformClick("LinkedIn")}
                className="text-blue-700 text-3xl cursor-pointer hover:scale-110"
              />
              <FaXTwitter
                onClick={() => handlePlatformClick("X")}
                className="text-black text-3xl cursor-pointer hover:scale-110"
              />
              <FaInstagram
                onClick={() => handlePlatformClick("Instagram")}
                className="text-pink-600 text-3xl cursor-pointer hover:scale-110"
              />
              <FaYoutube
                onClick={() => handlePlatformClick("Youtube")}
                className="text-red-600 text-3xl cursor-pointer hover:scale-110"
              />
              <FaFacebook
                onClick={() => handlePlatformClick("Facebook")}
                className="text-blue-600 text-3xl cursor-pointer hover:scale-110"
              />
            </div>

            {/* Other fields */}
            <input
              name="usernameOrName"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={feedData.usernameOrName}
              className="w-full p-3 border rounded"
            />
            <div className="w-full flex justify-end"></div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                name="categories"
                onChange={handleChange}
                value={feedData.categories}
                className="w-full sm:w-1/2 p-3 border rounded bg-white"
              >
                <option value="">Select a Category</option>
                <option value="🛠️ Any Thing">🛠️ Any Thing</option>
                <option value="🏆 Awards">🏆 Awards</option>
                <option value="🕴🏻 Business">🕴🏻 Business</option>
                <option value="💼 Careers">💼 Careers</option>
                <option value="😄 Casual & Humour">😄 Casual & Humour</option>
                <option value="🌦️ Climate">🌦️ Climate</option>
                <option value="🦸🏻 Comics">🦸🏻 Comics</option>
                <option value="👨🏻‍💻 Coding">👨🏻‍💻 Coding</option>
                <option value="👨🏻‍🍳 Cooking">👨🏻‍🍳 Cooking</option>
                <option value="💃🏻 Dance">💃🏻 Dance</option>
                <option value="📊 Economics">📊 Economics</option>
                <option value="🎓 Education">🎓 Education</option>
                <option value="🎭 Entertainment">🎭 Entertainment</option>
                <option value="🎉 Events">🎉 Events</option>
                <option value="👗 Fashion">👗 Fashion</option>
                <option value="🏦 Finance">🏦 Finance</option>
                <option value="🏋🏻 Fitness">🏋🏻 Fitness</option>
                <option value="🍔 Food">🍔 Food</option>
                <option value="🔧 Gadgets">🔧 Gadgets</option>
                <option value="🎮 Games">🎮 Games</option>
                <option value="📍 Geo Location">📍 Geo Location</option>
                <option value="🧘🏻 Health & Well being">
                  🧘🏻 Health & Well being
                </option>
                <option value="⛑️ Helpers">⛑️ Helpers</option>
                <option value="ℹ️ Information">ℹ️ Information</option>
                <option value="🌿 Nature">🌿 Nature</option>
                <option value="📰 News">📰 News</option>
                <option value="🪪 Networking">🪪 Networking</option>
                <option value="🎬 Movies">🎬 Movies</option>
                <option value="🎵 Music">🎵 Music</option>
                <option value="📷 Photography">📷 Photography</option>
                <option value="🎙️ Podcasts">🎙️ Podcasts</option>
                <option value="🏛️ Politics">🏛️ Politics</option>
                <option value="🛍️ Shopping">🛍️ Shopping</option>
                <option value="🎤 Singing">🎤 Singing</option>
                <option value="🌠 Space">🌠 Space</option>
                <option value="🚀 Startups">🚀 Startups</option>
                <option value="🔯 Spirituality">🔯 Spirituality</option>
                <option value="⚽ Sports">⚽ Sports</option>
                <option value="🤝🏻 Support">🤝🏻 Support</option>
                <option value="💻 Technology">💻 Technology</option>
                <option value="📈 Trending">📈 Trending</option>
                <option value="✈️ Travels">✈️ Travels</option>
                <option value="🚗 Vehicles">🚗 Vehicles</option>
                <option value="✍🏻 Writings">✍🏻 Writings</option>
                <option value="🔠 Other">🔠 Other</option>
                <option value="💡 Suggest">💡 Suggest</option>
              </select>
              <select
                onChange={handleChange}
                name="subCategories"
                value=""
                className="w-full sm:w-1/2 p-3 border rounded bg-white"
              >
                <option value="">Add SubCategory</option>
                {availableSubcategories
                  .filter((sub) => !feedData.subCategories.includes(sub))
                  .map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
              </select>
              {/* Show selected subcategories as tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {feedData.subCategories.map((sub) => (
                  <span key={sub} className="bg-blue-100 px-2 py-1 rounded">
                    {sub}
                    <button onClick={() => removeSubcategory(sub)}>×</button>
                  </span>
                ))}
              </div>{" "}
            </div>
            <input
              name="location"
              type="text"
              onChange={handleChange}
              value={feedData.location}
              placeholder="Location"
              className="w-full p-3 border rounded"
            />
            {/* <input
              name="title"
              type="text"
              placeholder="Title"
              onChange={handleChange}
              value={feedData.title}
              className="w-full p-3 border rounded"
            /> */}

            {/* Description */}
            <input
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleChange}
              value={feedData.description}
              className="w-full p-3 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCreatePage;
