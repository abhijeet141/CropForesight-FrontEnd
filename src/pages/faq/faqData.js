const faqs = [
  {
    cat: "model",
    q: "How does CropForesight determine the best crop for a piece of land?",
    a: "It uses a machine-learning model that analyses seven environmental parameters — nitrogen, phosphorus, potassium, pH, rainfall, humidity and temperature. From these it predicts the crop most likely to thrive and maximise yield.",
  },
  {
    cat: "model",
    q: "What factors does it consider when suggesting a crop?",
    a: "Soil nutrients (N, P, K), soil pH, rainfall, humidity and temperature. Together these capture the soil and climate conditions that decide which crops do well.",
  },
  {
    cat: "model",
    q: "Can it handle different soil conditions?",
    a: "Yes. By reading your soil's nutrient and pH values it adapts to different conditions — sandy, loamy or clayey — and suggests crops suited to them.",
  },
  {
    cat: "model",
    q: "How accurate are the recommendations?",
    a: "The model is trained on thousands of real soil–crop samples. Accuracy depends on how representative your input readings are, so use values from a recent soil health card for the best result.",
  },
  {
    cat: "model",
    q: "Does it work for all regions and climates?",
    a: "It covers a wide range of regions, but some crops have specific climate needs. The model weighs your temperature, humidity and rainfall to suggest crops realistic for your conditions.",
  },
  {
    cat: "leaf",
    q: "What photo should I upload for the leaf check?",
    a: "A clear, well-lit photo of a single tomato leaf filling the frame, against a plain background. The model is trained on tomato leaves only.",
  },
  {
    cat: "model",
    q: "Which crops can it recommend?",
    a: "22 crops in total — cereals like rice and maize, pulses like chickpea and lentil, fruits like mango, banana and grapes, and cash crops like cotton, coffee and jute.",
  },
  {
    cat: "data",
    q: "What happens to my data and images?",
    a: "Your soil readings are sent to the model only to generate a recommendation. Leaf photos are uploaded to Cloudinary so the disease model can process them.",
  },
];

export default faqs;
