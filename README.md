# 🏡 Windsurf Workshop - RentaCasa

Welcome to the **Windsurf Workshop**! In this workshop you'll learn to build a complete Airbnb-style property listing application using **Windsurf Cascade** and following step-by-step workflows.

## 🎯 What will you build?

A modern full-stack web application that includes:

- 🎨 **React Frontend** with TypeScript, React Bootstrap and Chart.js
- ⚡ **Node.js Backend** with Express, TypeScript and MongoDB
- 📊 **Statistics Dashboard** with interactive charts
- 🔍 **Advanced Filter System**
- 📱 **Responsive Design** for all devices

## 🚀 Technologies

### Frontend (`/app`)
- React 19.x with TypeScript
- React Bootstrap for UI
- Chart.js for visualizations
- Axios for HTTP requests
- React Router for navigation

### Backend (`/api`)
- Node.js 22 LTS
- Express with TypeScript
- MongoDB + Mongoose 8.x
- Architecture: Routes → Controllers → Services → Models

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Windsurf IDE** installed
- ✅ **Node.js 22.x** (will be installed in Step 0)
- ✅ **MongoDB Atlas** with the `sample_airbnb` database
- ✅ **MongoDB MCP Server** configured in Windsurf

## 🎓 How to use this Workshop

This workshop is designed to be completed using **Windsurf Cascade** and the workflows included in the `.windsurf/workflows/` folder.

### Step by Step

Follow the workflows in order using the `/` command in Cascade:

#### **Step 0: Environment Verification** 
```
/step-0-install-all
```
Verify and install Node.js 22.x using NVM.

#### **Step 1: Initial Project**
```
/step-1-initial-project
```
Create the basic structure with React (frontend) and Express (backend). Implement the first "Hello Windsurf" endpoint.

#### **Step 2: Verify MongoDB Access**
```
/step-2-verify-mongo-access
```
Use the MongoDB MCP Server to verify connectivity with the `sample_airbnb` database.

#### **Step 3: Create Initial Routes**
```
/step-3-create-initial-routes
```
Implement the complete backend:
- Listing Model with Mongoose
- Controllers with validation
- GET Routes (listing and detail)
- Search endpoint with filters

#### **Step 4: Create UI for Listings**
```
/step-4-create-ui-get-listings
```
Build the frontend to display properties:
- Listing with pagination
- Property cards
- API integration

#### **Step 5: UI Improvements**
```
/step-5-ui-improvements
```
Improve the visual design:
- Custom CSS styles
- Header with glass morphism
- Responsive design
- Green color palette

#### **Step 6: Detail Modal**
```
/step-6-create-ui-detail-modal
```
Implement a modal to view complete details of each property.

#### **Step 7: Filter System**
```
/step-7-plan-filters
```
Add advanced filters:
- By property type
- By price range
- By number of bedrooms
- By location

#### **Step 8: Statistics API**
```
/step-8-statistics-api
```
Create the statistics module in the backend:
- 7 statistics endpoints
- MongoDB aggregations
- Consistent filters
- Decimal128 conversion

#### **Step 9: Statistics Dashboard**
```
/step-9-create-statistics-ui
```
Build the dashboard with Chart.js:
- 4 KPI Cards
- 6 interactive charts
- Filter panel
- Minimalist green design

## 🎨 Reference Designs

In the `/ui` folder you'll find:
- `design.png` - Property listing design
- `modal.png` - Detail modal design

## 🏗️ Project Architecture

```
workshop_windsurf/
├── .windsurf/           # Windsurf Workflows and rules
│   ├── workflows/       # 10 step-by-step workflows
│   └── rules/          # Language and tech stack rules
├── api/                # Node.js + Express Backend
│   ├── src/
│   │   ├── config/     # DB Configuration
│   │   ├── models/     # Mongoose Models
│   │   ├── controllers/# Business Logic
│   │   ├── routes/     # Route Definitions
│   │   ├── services/   # Services (statistics)
│   │   └── types/      # TypeScript Types
│   └── package.json
├── app/                # React Frontend
│   ├── src/
│   │   ├── components/ # React Components
│   │   ├── pages/      # Pages (Statistics)
│   │   ├── services/   # API Clients
│   │   ├── types/      # TypeScript Types
│   │   └── utils/      # Utilities (Chart.js config)
│   └── package.json
└── ui/                 # Reference designs
```

## 🚦 How to Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/rafaelpatinogoji-demo-org/rentacasa.git
   cd rentacasa
   ```

2. **Open the project in Windsurf**
   ```bash
   windsurf .
   ```

3. **Open Cascade** (Cmd/Ctrl + L)

4. **Run the first workflow**
   ```
   /step-0-install-all
   ```

5. **Follow the workflows in order** until you complete the project

## 📚 Additional Resources

### Reference Documentation
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Mongoose](https://mongoosejs.com)
- [Chart.js Documentation](https://www.chartjs.org)
- [React Bootstrap](https://react-bootstrap.github.io)

### Windsurf
- [Windsurf Documentation](https://docs.codeium.com/windsurf)
- [Cascade AI Agent](https://docs.codeium.com/windsurf/cascade)
- [Workflows Guide](https://docs.codeium.com/windsurf/workflows)

## 🎯 Learning Objectives

By completing this workshop, you'll have learned to:

- ✅ Use **Windsurf Cascade** for AI-assisted development
- ✅ Create reusable workflows
- ✅ Build REST APIs with Express and TypeScript
- ✅ Work with MongoDB and aggregations
- ✅ Develop interfaces with React and TypeScript
- ✅ Implement visualizations with Chart.js
- ✅ Apply clean architecture (Routes → Controllers → Services)
- ✅ Handle state and navigation in React
- ✅ Create responsive designs with Bootstrap

## 🌟 Final Result

By completing all workflows, you'll have a complete application with:

- 📊 Statistics dashboard with 6 interactive charts
- 🏠 Property listing with advanced filters
- 🔍 Search and pagination
- 📱 Responsive and modern design
- ⚡ Complete REST API with 10+ endpoints
- 🎨 Professional UI with green palette

## 🔗 View Completed Version

If you want to see the complete final code, switch to the `finished-version` branch:

```bash
git checkout finished-version
```

## 💡 Workshop Tips

1. **Read each workflow completely** before executing it
2. **Use Cascade** for all implementations
3. **Verify each step** before continuing to the next
4. **Test the application** after each workflow
5. **Check the finished-version branch** if you get stuck

## 🤝 Contributions

This is an educational project. If you find improvements or errors:

1. Create an issue describing the problem
2. Or send a pull request with the solution

## 📝 License

This project is open source and available under the MIT license.

## 🙏 Credits

Workshop created to demonstrate the capabilities of **Windsurf IDE** and **Cascade AI Agent**.

---

**Enjoy building with Windsurf! 🚀**

Questions? Open an issue in the repository.
