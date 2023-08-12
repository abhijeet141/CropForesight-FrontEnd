<h1 align="center" id="top">CropForesight (Frontend)</h1>
<p align="center">This Repository includes the frontend code of the <a href="crop-foresight-front-end.vercel.app" >CropForesight</a> website. The frontend of the project is written in HTML, CSS, Javascript, and ReactJS. Before moving ahead, a short intro about the project.</p>

 <h1 align="center">CropForesight🌾</h1>
CropForesight is an advanced website designed to assist farmers and agriculture enthusiasts in making smart choices about which crops to grow on their land. It achieves this by using special computer programs that can learn from data and environmental information. These programs take into account factors like soil nutrients, rainfall, pH levels, and weather conditions. With all this data, CropForesight can accurately predict the best crop to cultivate, helping farmers maximize their productivity and yield. It's like having a knowledgeable farming expert to guide you towards success!
<br>

🌐 [Live Demo](crop-foresight-front-end.vercel.app)

 <h1 align="center">Table of Contents</h1>

- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

<h1 align="center">Features</h1>

- Intelligent crop recommendation based on soil composition, rainfall, pH, potassium, humidity, and temperature.
- User-friendly interface to input land and environmental parameters.
- Efficient machine learning model leveraging Gaussian Naïve Bayes algorithm.
- Responsive frontend developed using ReactJS for seamless user experience.
- Scalable backend powered by FastAPI for quick data processing.
- The platform can analyze historical agricultural data to identify trends and patterns, aiding in better decision-making for future crops.
- CropForesight can utilize its data analysis capabilities to predict and warn users about potential pest and disease outbreaks, allowing for timely preventive measures.
- By integrating real-time weather data, CropForesight can provide up-to-date recommendations, adapting to sudden changes in weather patterns for better accuracy.

 <h1 align="center">Technologies</h1>

<h3 align="center">HTML, CSS, Javascript, ReactJS</h3>
 
 <h1 align="center">Usage</h1>

To experience the power of CropForesight, follow these simple steps:

✅ Visit the CropForesight website: [https://abhijeet141.github.io/CropForesight-FrontEnd/](https://abhijeet141.github.io/CropForesight-FrontEnd/).

✅ Enter the required details such as soil nitrogen value, phosphorus value, rainfall, pH, potassium, humidity, and temperature.

✅ Click on the "Recommend Crop" button to generate the optimal crop recommendation.

✅ Explore the recommended crop and gain insights into its suitability for your land.

## Local Development

If you want to contribute to CropForesight or run it locally for development purposes, follow these steps:

1. Clone the frontend repository:

   ```sh
   git clone https://github.com/abhijeet141/CropForesight-FrontEnd.git
   ```

2. Change to the project directory:

   ```sh
   cd CropForesight-FrontEnd
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

4. Run the frontend:

   ```sh
   npm start
   ```

5. Clone the backend repository:

   ```sh
   git clone https://github.com/abhijeet141/CropForesight_BackEnd.git
   ```

6. Change to the CropForesight_BackEnd directory:

   ```sh
   cd CropForesight_BackEnd
   ```

7. Install the required dependencies:

   ```sh
   pip install -r requirements.txt
   ```

````


8. Run the backend:

```sh
 uvicorn main:app --reload
````

9. Open the website in your browser at [http://localhost:3000](http://localhost:3000) to access the local instance of CropForesight.

## Deployment

✅ CropForesight's frontend is deployed and can be accessed online at [https://crop-foresight-front-end.vercel.app/](https://crop-foresight-front-end.vercel.app/).

✅ Feel free to explore the website and witness the power of smart crop recommendation firsthand!

## Contributing

We welcome contributions from anyone who is interested in improving this project. If you'd like to contribute, here are some ways you can get started:

- Submit a bug report if you find any issues with the application.
- Suggest new features or improvements.
- Submit a pull request to fix a bug or add a feature after an issue is assigned to you.

To submit a pull request, please follow these steps:

1. Fork the Project
2. Clone your forked repository

```sh
 git clone https://github.com/<your_github_username>/CropForesight-FrontEnd.git
```

3. Now go ahead and create a new branch and move to the branch
   ```sh
   git checkout -b fix-issue-<ISSUE-NUMBER>
   ```
4. After you have added your changes, follow the following command chain

   - Check the changed files

   ```sh
    git status -s
   ```

   - Add all the files to the staging area
     ```sh
     git add .
     ```
     or
     ```sh
     git add <file_name1> <file_name2>
     ```
   - Commit your changes

   ```sh
    git commit -m "<EXPLAIN-YOUR_CHANGES>"
   ```

5. Push your changes
   ```sh
   git push origin fix-issue-<ISSUE-NUMBER>
   ```
6. Open a Pull Request

Congratulations! 🎉 you've made your contribution.

<h1>GSSOC'23 Issue TimeLine</h1>
	
	
- Once an issue is assigned,the assignee is expected to submit a pr for review withing a week of the assignment. 
	
- If the assignee fails to comply with the deadline, the issue will be assigned to the next person who had who had requested to be assigned.

<h1>GSSOC'23 Pointer System</h1>
<h2> Level 1 - Documentation/Minor bug fix </h2>
<h3> Points - 10 </h3>
	
	
- Contributors can update existing documentation, write new documentation for features or code and improve the overall organisation and clarity of the projects documentation.  
	
	
- Minor bug fixes refer to fixing small isolated issues in the codebase.  
	
	
- Fixing issues such as typos, brokel links, or minor performance problems.
	
	
- Bug fixes are an important part of maintaining stability of and reliability of of an open-source project and every bug fix, no matter how small, contributes to the overall health of the project.

<h2> Level 2 - Enhancement of existing features </h2>
<h3> Points - 25 </h3>
	
	
-  Feature or enhancement contributions refer to adding new functionality to an open source project.  
	
- Contributors can add new features, improve existing features, or add new functionality to existing features.

<h2> Level 3 - Refactoring/ Adding functionalities </h2>
<h3> Points - 45 </h3>
	
	
- Core contributions, such as implementing major features or refactoring significant parts of the codebase. This needs a deep understanding of the codebase and its patterns.
	
	
 
Please follow the cotribution guide in all your interactions with the project.
We will review your pull request and provide feedback. Once your changes are approved, we will merge them into the main branch.

## Contributors ✨

We would like to express our heartfelt gratitude to the following contributors for their valuable contributions to Friday: We would like to express our heartfelt gratitude to the following contributors for their valuable contributions to CropForesight-FrontEnd:

Thanks to these wonderful people.

Our Contributors

abhijeet141
Commits: 173

SubhamB2003
Commits: 24

SyedImtiyaz-1
Commits: 12

AlfiyaSiddique
Commits: 11

rishuraj1
Commits: 10

NamandeepNegi
Commits: 8

Sameep002
Commits: 7

Tisha6661
Commits: 7

krutikajichkar
Commits: 6

akuldeepj
Commits: 6

karthiknadar1204
Commits: 6

Akshatchaube01
Commits: 5

Prajwal0225
Commits: 5

Avinash905
Commits: 5

Pragati-3003
Commits: 5

BhartiNagpure
Commits: 4

abhi03ruchi
Commits: 4

1Shubham7
Commits: 4

thestarsahil
Commits: 4

somenath203
Commits: 3

kaur-rajdeep
Commits: 3

HimanshuNarware
Commits: 3

akshaysoni10
Commits: 2

Tarun0951
Commits: 2

dheeraj1129
Commits: 2

Dimple-Choudhary
Commits: 2

Geeta259
Commits: 2

GiriprasadKrishnamurthy
Commits: 2

Harshu467
Commits: 2

kaashikaagrawal
Commits: 2

<p>
  <img src="https://api.vaunt.dev/v1/github/entities/abhijeet141/repositories/CropForesight-FrontEnd/contributors?format=svg&limit=54" width="600" height"250" />
</p>

## License

This project is licensed under the MIT License.

Please feel free to modify the sections and add any additional information or badges relevant to your project. Let me know if you need further help.
<br><br>
<a href="#top">Back to top</a>

</div>
