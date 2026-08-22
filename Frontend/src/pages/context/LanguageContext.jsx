import React, { createContext, useContext, useEffect, useState } from "react";

const translations = {
  // =========================================================
  // ENGLISH
  // =========================================================

  en: {
    login: "Login",
    getStarted: "Get Started",

    builtForTrainers: "Built for Elite Trainers",

    heroTitle1: "Manage Your Gym",
    heroTitleHighlight: "Without",
    heroTitle2: "the Paperwork.",

    heroDescription:
      "Track members, collect payments, and manage finances from one simple platform designed for serious trainers.",

    featuresLabel: "Built for Elite Trainers",

    featuresTitle: "Everything you need to run smarter.",

    featuresDescription:
      "Replace scattered notebooks and spreadsheets with one powerful system built around your training business.",

    feature1Title: "Replaces Manual Notebooks",

    feature1Description:
      "Digitize your client records, workout plans, and attendance. Say goodbye to lost pages.",

    feature2Title: "Automatic Reminders",

    feature2Description:
      "Reduce no-shows and late payments with automated SMS and push notifications sent directly to clients.",

    feature3Title: "Financial Insights",

    feature3Description:
      "Track revenue, monitor expenses, and forecast growth with simple, powerful charts.",

    ctaTitle: "Ready to level up?",

    ctaDescription:
      "Join the elite network of trainers using IronPulse to manage their businesses.",

    getStartedNow: "Get Started Now",

    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",

    copyright: "© 2026 IronPulse. All rights reserved.",

    contactPageTitle: "Contact Us",
    contactPageHeading: "How can we help?",
    contactPageDescription:
      "Have a question about IronPulse, your account, billing, or our trainer management features? Send us a message and our team will get back to you.",

    getInTouch: "Get in touch",
    getInTouchDescription:
      "We're here to help trainers spend less time managing paperwork and more time helping their clients.",

    email: "Email",
    phone: "Phone",
    location: "Location",

    sendMessageTitle: "Send us a message",
    messageSubmitted: "Your message has been submitted successfully.",

    name: "Name",
    yourName: "Your name",
    subject: "Subject",
    howCanWeHelp: "How can we help?",
    message: "Message",
    writeYourMessage: "Write your message...",
    sendMessage: "Send Message",

    backHome: "Back Home",

    privacyPageTitle: "Privacy Policy",
    lastUpdated: "Last updated: August 2026",

    privacyIntro:
      "At IronPulse, we respect your privacy and are committed to protecting the information you provide when using our platform.",

    privacySection1: "1. Information We Collect",
    privacySection1Text1:
      "When you use IronPulse, we may collect information that you provide directly to us, including your name, email address, phone number, account information, and information related to your gym or training business.",
    privacySection1Text2:
      "We may also collect information generated through your use of the platform, such as account activity, client management information, workout plans, financial records, and system preferences.",

    privacySection2: "2. How We Use Your Information",
    privacySection2Text:
      "We use collected information to provide, maintain, and improve IronPulse and its features.",
    privacySection2Bullet1: "Provide and manage your account.",
    privacySection2Bullet2: "Provide gym and trainer management features.",
    privacySection2Bullet3: "Process and manage payments where applicable.",
    privacySection2Bullet4: "Send important account notifications.",
    privacySection2Bullet5: "Provide customer support.",
    privacySection2Bullet6:
      "Improve the security and reliability of our platform.",

    privacySection3: "3. Information Security",
    privacySection3Text1:
      "We take reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.",
    privacySection3Text2:
      "However, no internet-based service can guarantee absolute security.",

    privacySection4: "4. Sharing of Information",
    privacySection4Text1: "We do not sell your personal information.",
    privacySection4Text2:
      "We may share information with service providers that help us operate the platform, such as hosting, authentication, analytics, email, payment, or storage providers.",

    privacySection5: "5. Cookies and Similar Technologies",
    privacySection5Text:
      "IronPulse may use cookies or similar technologies to maintain authentication sessions, remember preferences, improve functionality, and understand how users interact with the platform.",

    privacySection6: "6. Your Rights",
    privacySection6Text:
      "Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or request a copy of certain information.",

    privacySection7: "7. Data Retention",
    privacySection7Text:
      "We retain information for as long as reasonably necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.",

    privacySection8: "8. Children's Privacy",
    privacySection8Text:
      "IronPulse is not intended for children who are unable to lawfully use the service under applicable laws.",

    privacySection9: "9. Changes to This Policy",
    privacySection9Text:
      "We may update this Privacy Policy from time to time. When changes are made, the updated policy will be published on this page with a revised update date.",

    privacySection10: "10. Contact Us",
    privacySection10Text:
      "If you have questions about this Privacy Policy, please contact us through our contact page.",

    contactIronPulse: "Contact IronPulse →",
    backHome: "Back Home",

    // Terms & Conditions
    termsConditions: "Terms & Conditions",

    termsIntro:
      "These Terms & Conditions govern your access to and use of the IronPulse platform.",

    terms1: "1. Acceptance of Terms",
    terms1p1:
      "By creating an account or using IronPulse, you agree to be bound by these Terms & Conditions.",
    terms1p2:
      "If you do not agree with these terms, you should not use the platform.",

    terms2: "2. Use of the Platform",
    terms2p1:
      "IronPulse provides tools designed to help trainers and gym businesses manage their operations, clients, workouts, payments, and related information.",
    terms2p2:
      "You agree to use the platform only for lawful purposes and in accordance with these terms.",

    terms3: "3. Account Responsibilities",
    terms3p1:
      "You are responsible for maintaining the confidentiality of your account credentials.",
    terms3p2:
      "You are also responsible for activity performed through your account and should immediately notify us if you believe your account has been accessed without authorization.",

    terms4: "4. Accurate Information",
    terms4p1:
      "You agree to provide accurate and current information when creating and maintaining your IronPulse account.",

    terms5: "5. Prohibited Activities",
    terms5p1: "You may not use IronPulse to:",
    terms5li1: "Break applicable laws or regulations.",
    terms5li2: "Attempt to gain unauthorized access to the platform.",
    terms5li3: "Interfere with the operation of the service.",
    terms5li4: "Upload malicious software or harmful content.",
    terms5li5: "Abuse or misuse another user's information.",
    terms5li6: "Attempt to reverse engineer protected parts of the service.",

    terms6: "6. User Content and Data",
    terms6p1:
      "You remain responsible for information and content that you enter into IronPulse.",
    terms6p2:
      "You must ensure that you have the necessary rights and permissions to store and process information you provide through the platform.",

    terms7: "7. Payments and Subscriptions",
    terms7p1:
      "If IronPulse introduces paid plans, subscriptions, or other paid services, additional pricing and billing terms may apply.",
    terms7p2:
      "Applicable fees, renewal terms, cancellation rules, and payment requirements will be presented before purchase.",

    terms8: "8. Availability",
    terms8p1:
      "We aim to keep IronPulse available and reliable, but we do not guarantee that the service will always be uninterrupted, completely secure, or error-free.",

    terms9: "9. Intellectual Property",
    terms9p1:
      "The IronPulse platform, branding, software, design, and related materials are protected by applicable intellectual property laws.",
    terms9p2:
      "You may not copy, modify, distribute, or commercially exploit protected parts of the platform without appropriate authorization.",

    terms10: "10. Account Suspension or Termination",
    terms10p1:
      "We may suspend or terminate accounts that violate these terms, create security risks, engage in abuse, or otherwise misuse the platform.",
    terms10p2:
      "You may stop using the service at any time, subject to any applicable subscription or contractual obligations.",

    terms11: "11. Disclaimer",
    terms11p1:
      "IronPulse is provided as a management and productivity platform. Information and tools provided through the platform should not be considered professional legal, financial, medical, or other regulated advice.",

    terms12: "12. Limitation of Liability",
    terms12p1:
      "To the extent permitted by applicable law, IronPulse and its operators will not be responsible for indirect, incidental, special, or consequential damages resulting from your use of the platform.",

    terms13: "13. Changes to These Terms",
    terms13p1:
      "We may update these Terms & Conditions as our platform changes. Updated terms will be published on this page with a revised update date.",

    terms14: "14. Contact",
    terms14p1:
      "If you have questions about these Terms & Conditions, contact us through our contact page.",

    contactIronPulse: "Contact IronPulse →",

    // Forgot Password
    forgotPasswordTitle: "Reset Your Password",
    forgotPasswordHeading: "Forgot your password?",
    forgotPasswordDescription:
      "Enter the email address associated with your trainer account. We'll send you a verification code to reset your password.",

    emailAddress: "Email Address",
    emailPlaceholder: "trainer@ironpulse.com",

    sendResetCode: "Send Reset Code",
    sending: "Sending...",

    backToTrainerLogin: "Back to Trainer Login",

    emailRequired: "Email address is required.",
    invalidEmail: "Please enter a valid email address.",

    resetCodeSent: "If this email is registered, a reset code has been sent.",

    forgotPasswordError: "Unable to process your request. Please try again.",

    // LOGIN PAGE

    trainerAccessPortal: "Trainer Access Portal",

    emailAddress: "Email Address",
    trainerEmailPlaceholder: "trainer@ironpulse.com",

    password: "Password",
    forgotPassword: "Forgot?",

    showPassword: "Show password",
    hidePassword: "Hide password",

    rememberDevice: "Remember this device",

    secureLogin: "Secure Login",
    signingIn: "Signing In...",

    newTrainer: "New trainer?",
    requestAccess: "Request Access",

    emailRequired: "Email address is required",
    validEmail: "Enter a valid email address",
    passwordRequired: "Password is required",

    loginFailed: "Login failed",
    unableToLogin: "Unable to login",

    signupPageTitle: "Trainer Portal Registration",
    signupFullName: "Full Name",
    signupEmailAddress: "Email Address",
    signupPassword: "Password",
    signupConfirmPassword: "Confirm Password",

    signupNamePlaceholder: "John Doe",
    signupEmailPlaceholder: "trainer@ironpulse.com",
    signupPasswordPlaceholder: "••••••••",

    signupNameRequired: "Full name is required",
    signupEmailRequired: "Email address is required",
    signupEmailInvalid: "Enter a valid email address",
    signupPasswordRequired: "Password is required",
    signupPasswordMinLength: "Password must be at least 8 characters",
    signupConfirmPasswordRequired: "Please confirm your password",
    signupPasswordsDoNotMatch: "Passwords do not match",

    signupCreatingAccount: "Creating Account...",
    signupCreateAccount: "Create Account",

    signupAlreadyHaveAccount: "Already have an account?",
    signupLoginHere: "Login here",

    signupHidePassword: "Hide password",
    signupShowPassword: "Show password",
    signupHideConfirmPassword: "Hide confirm password",
    signupShowConfirmPassword: "Show confirm password",

    signupUnableToCreateAccount: "Unable to create account",

    addMember: "Add New Member",
    addMemberDescription: "Enter the details to register a new gym member.",

    cancel: "Cancel",

    basicInformation: "Basic Information",
    basicInformationDescription: "Enter the member's contact information.",

    fullName: "Full Name",
    fullNamePlaceholder: "e.g. John Doe",

    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "(555) 000-0000",

    emailAddress: "Email Address",
    emailPlaceholder: "john.doe@example.com",

    monthlyFee: "Monthly Fee",
    monthlyFeePlaceholder: "Enter monthly fee",

    membershipDetails: "Membership Details",
    membershipDetailsDescription: "Set the member's starting date.",

    startDate: "Start Date",

    additionalInformation: "Additional Information",
    additionalInformationDescription:
      "Add any internal notes about this member.",

    internalNotes: "Internal Notes (Optional)",
    internalNotesPlaceholder:
      "Goals, training preferences, or general notes...",

    saveMember: "Save Member",
    saving: "Saving...",

    addMemberError: "Unable to add member",

    bottomNav: {
      dashboard: "Dashboard",
      members: "Members",
      payments: "Payments",
      expenses: "Expenses",
      menu: "Menu",
    },

    dashboardPage: {
      overview: "Overview",

      totalMembers: "Total Members",
      activeMembers: "Active members",

      paidThisMonth: "Paid This Month",
      ofMembersPaid: "of members paid",

      unpaid: "Unpaid",
      actionRequired: "Action Required",

      monthlyRevenue: "Monthly Revenue",
      expenses: "Expenses",

      revenueTrend: "Revenue Trend",
      actualMemberPayments: "Actual member payments",

      thisMonth: "This Month",
      lastMonth: "Last Month",
      last3Months: "Last 3 Months",
      last6Months: "Last 6 Months",

      noRevenueData: "No revenue data available.",

      actionableUnpaid: "Actionable Unpaid",
      unpaidCount: "unpaid",
      allMembersPaid: "All members have paid this month.",
      paymentDue: "Payment due",
      remind: "Remind",

      recentPayments: "Recent Payments",
      noPayments: "No payments recorded this month.",
    },

    dashboard: "Dashboard",
    members: "Members",
    expenses: "Expenses",
    profile: "Profile",
    elitePerformance: "Elite Performance",
    addNewMember: "Add New Member",
    logout: "Logout",
    openProfile: "Open profile",

    editMember: {
      back: "Back",
      title: "Edit Member",
      subtitle: "Update member information",

      member: "Member",
      updateInformation: "Update the information below",

      personalInformation: "Personal Information",
      personalDescription: "Update the member's basic information.",

      fullName: "Full Name",
      fullNamePlaceholder: "Enter full name",

      phoneNumber: "Phone Number",
      phonePlaceholder: "Enter phone number",

      emailAddress: "Email Address",
      emailPlaceholder: "Enter email address",

      membershipInformation: "Membership Information",
      membershipDescription: "Update the member's membership details.",

      monthlyFee: "Monthly Fee",
      monthlyFeePlaceholder: "Enter monthly fee",

      startDate: "Start Date",

      cancel: "Cancel",
      saveChanges: "Save Changes",
      saving: "Saving...",

      defaultMember: "Member",

      getMemberError: "Unable to get member",
      updateMemberError: "Unable to update member",
    },

    expensesPage: {
      title: "Expenses & Financial Overview",
      subtitle: "Track your gym income, expenses, and net profit.",

      financialOverview: "Financial Overview",

      totalIncome: "Total Income",
      totalExpenses: "Total Expenses",
      netProfit: "Net Profit",

      income: "Income",
      expenses: "Expenses",

      memberPayments: "Member Payments",
      actualMemberPayments: "Actual payments received from members",

      otherExpenses: "Other Expenses",
      otherExpensesDescription: "Add and manage additional gym expenses.",

      addExpense: "Add Expense",
      addNewExpense: "Add New Expense",

      expenseName: "Expense Name",
      expenseNamePlaceholder: "e.g. Electricity, Rent, Equipment",

      expenseAmount: "Amount",
      expenseAmountPlaceholder: "Enter amount",

      expenseDate: "Date",
      expenseDatePlaceholder: "Select date",

      expenseDescription: "Description",
      expenseDescriptionPlaceholder: "Optional description...",

      saveExpense: "Save Expense",
      savingExpense: "Saving...",

      cancel: "Cancel",

      noExpenses: "No expenses recorded yet.",
      noPayments: "No member payments recorded yet.",

      recentExpenses: "Recent Expenses",
      recentPayments: "Recent Member Payments",

      deleteExpense: "Delete Expense",
      editExpense: "Edit Expense",

      deleteExpenseConfirm: "Are you sure you want to delete this expense?",

      delete: "Delete",

      thisMonth: "This Month",
      lastMonth: "Last Month",
      thisYear: "This Year",

      total: "Total",

      incomeCalculation:
        "Income is calculated from actual payments received from members.",

      netProfitCalculation:
        "Net profit is calculated by subtracting total expenses from total income.",

      loading: "Loading financial data...",

      loadError: "Unable to load financial data.",

      addExpenseError: "Unable to add expense.",

      deleteExpenseError: "Unable to delete expense.",

      expenseAdded: "Expense added successfully.",

      expenseDeleted: "Expense deleted successfully.",

      requiredExpenseName: "Expense name is required.",
      requiredExpenseAmount: "Expense amount is required.",
      invalidExpenseAmount: "Please enter a valid amount.",

      currency: "$",
    },

    memberCard: {
      paid: "PAID",
      unpaid: "UNPAID",
      dueDate: "DUE DATE",
      paymentDue: "Payment due",
      noPaymentYet: "No payment yet",
      editMember: "Edit Member",
      recordPayment: "Record Payment",
      removeMember: "Remove Member",
      actionsFor: "Actions for",
    },
    memberDetailsPage: {
      memberDetails: "Member Details",
      loading: "Loading...",
      memberNotFound: "Member not found",

      call: "Call",
      email: "Email",

      currentStatus: "Current Status",
      paid: "Paid",
      unpaid: "Unpaid",

      monthlyFee: "Monthly Fee",
      memberSince: "Member Since",

      paymentHistory: "Payment History",
      previousMembershipPayments: "Previous membership payments",

      month: "Month",
      date: "Date",
      amount: "Amount",
      status: "Status",

      loadingPayments: "Loading payments...",
      noPayments: "No payments recorded yet.",

      recordNewPayment: "Record New Payment",
      paidStatus: "PAID",
    },

    membersPage: {
      dashboard: "Dashboard",
      members: "Members",
      profile: "Profile",
      expenses: "Expenses",

      memberDirectory: "Member Directory",
      manageMembers: "Manage clients, view payment status, and track activity.",

      searchPlaceholder: "Search by name, phone, or email...",

      allMembers: "All Members",
      paid: "Paid",
      unpaid: "Unpaid",

      noMembersFound: "No members found.",
      clearSearch: "Clear search",

      addNewMember: "Add new member",

      removeMemberConfirm:
        "Are you sure you want to remove this member? This action cannot be undone.",

      unableToRemoveMember: "Unable to remove member",
      memberRemoved: "Member removed successfully",

      unableToGetMembers: "Unable to get members",
      paymentStatusError: "Unable to get payment status",

      paidStatus: "PAID",
      unpaidStatus: "UNPAID",

      dueDate: "DUE DATE",
      paymentDue: "Payment due",
      lastPayment: "LAST PAYMENT",
      noPaymentYet: "No payment yet",
    },

    recordPaymentPage: {
      recordPayment: "Record Payment",
      processingManualTransaction: "Processing manual transaction for",
      member: "member",

      cancel: "CANCEL",

      billingPeriod: "BILLING PERIOD",
      year: "YEAR",
      month: "MONTH",
      done: "DONE",

      amountCollected: "AMOUNT COLLECTED",
      standardMonthlyFee: "Standard monthly fee applies.",

      paymentMethod: "PAYMENT METHOD",
      cash: "CASH",
      card: "CARD",
      transfer: "TRANSFER",

      memberInformationMissing:
        "Member information is missing. Please go back and select the member again.",

      validPaymentAmount: "Please enter a valid payment amount.",

      unableToAddPayment: "Unable to add payment",

      paymentRecordingError:
        "Something went wrong while recording the payment.",

      confirmPayment: "CONFIRM PAYMENT",

      months: {
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December",
      },
    },
    trainerProfilePage: {
      title: "Trainer Profile",
      subtitle: "Manage your account and gym information",

      gymTrainer: "Gym Trainer",

      editProfile: "Edit Profile",
      cancelEdit: "Cancel Edit",

      personalInformation: "Personal Information",
      personalInformationDescription: "Your personal contact information.",

      fullName: "Full Name",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",

      about: "About",
      aboutPlaceholder: "Tell members a little about yourself...",

      gymInformation: "Gym Information",
      gymInformationDescription: "Information about your gym.",

      gymName: "Gym Name",
      gymAddress: "Gym Address",

      saveChanges: "Save Changes",
      saving: "Saving...",

      security: "Security",
      securityDescription: "Manage your account security.",

      changePassword: "Change Password",
      updateYourAccountPassword: "Update your account password",

      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",

      updatePassword: "Update Password",
      updating: "Updating...",
      cancel: "Cancel",

      logout: "Log Out",

      profileUpdatedSuccessfully: "Profile updated successfully.",
      newPasswordsDoNotMatch: "New passwords do not match.",
      passwordMinimumLength: "Password should contain at least 6 characters.",

      unableToLoadProfile: "Unable to load profile",
      unableToUpdateProfile: "Unable to update profile",
      unableToUploadImage: "Unable to upload image",
      unableToUpdatePassword: "Unable to update password",
      unableToLogout: "Unable to logout",

      profileUpdateError: "Something went wrong while updating your profile.",

      passwordChangedSuccessfully: "Password changed successfully.",

      somethingWentWrong: "Something went wrong while processing your request.",
    },

    installApp: "Install App",

    // Add Member / Fitness Information
    fitnessInformation: "Fitness Information",
    fitnessInformationDescription:
      "Add the member's physical and fitness information.",

    age: "Age",
    agePlaceholder: "Enter age",

    height: "Height (cm)",
    heightPlaceholder: "e.g. 175",

    weight: "Weight (kg)",
    weightPlaceholder: "e.g. 70",

    exerciseType: "Exercise Type",
    selectExerciseType: "Select exercise type",

    dietNutrition: "Diet / Nutrition",
    dietPlaceholder: "e.g. High protein, low sugar, vegetarian...",

    exerciseTypes: {
      gym: "Gym",
      fitness: "Fitness",
      personalTraining: "Personal Training",
      strengthTraining: "Strength Training",
      cardio: "Cardio",
      weightLoss: "Weight Loss",
      bodybuilding: "Bodybuilding",
      other: "Other",
    },

    // Member Details / Fitness
    physicalFitnessInformation:
      "Physical and fitness information for this member",

    years: "years",
    notAdded: "Not added",
    heightLabel: "Height",
    weightLabel: "Weight",
    exercise: "Exercise",

    noDietInformation: "No diet information added",

    // Internal Notes
    internalNotes: "Internal Notes",
    internalNotesPlaceholder:
      "Add private notes about this member, such as goals, preferences, special requirements, or other important information.",

    // Member Details errors
    unableToGetMember: "Unable to get member",
    unableToGetPayments: "Unable to get payments",

    memberDetailsPage: {
      loading: "Loading member details...",
      memberNotFound: "Member not found",
      memberDetails: "Member Details",

      call: "Call",
      email: "Email",

      currentStatus: "Current Status",
      paid: "Paid",
      unpaid: "Unpaid",

      monthlyFee: "Monthly Fee",
      memberSince: "Member Since",

      fitnessInformation: "Fitness Information",
      physicalFitnessInformation:
        "Physical and fitness information for this member",

      age: "Age",
      height: "Height",
      weight: "Weight",
      exercise: "Exercise",

      years: "years",
      notAdded: "Not added",

      dietNutrition: "Diet / Nutrition",
      noDietInformation: "No diet information added",

      internalNotes: "Internal Notes",
      noInternalNotes: "No internal notes added",

      paymentHistory: "Payment History",
      previousMembershipPayments: "Previous membership payments",

      month: "Month",
      date: "Date",
      amount: "Amount",
      status: "Status",

      loadingPayments: "Loading payment history...",
      noPayments: "No payments recorded yet",
      paidStatus: "Paid",

      recordNewPayment: "Record New Payment",
    },
  },

  // =========================================================
  // PERSIAN / فارسی
  // =========================================================

  fa: {
    login: "ورود",
    getStarted: "شروع کنید",

    builtForTrainers: "ساخته شده برای مربیان حرفه‌ای",

    heroTitle1: "باشگاه خود را مدیریت کنید",
    heroTitleHighlight: "بدون",
    heroTitle2: "کاغذبازی.",

    heroDescription:
      "اعضا را مدیریت کنید، پرداخت‌ها را دریافت کنید و امور مالی باشگاه خود را از طریق یک پلتفرم ساده و قدرتمند مدیریت کنید.",

    featuresLabel: "ساخته شده برای مربیان حرفه‌ای",

    featuresTitle: "همه چیز برای مدیریت هوشمند باشگاه.",

    featuresDescription:
      "دفترچه‌ها و فایل‌های پراکنده را با یک سیستم قدرتمند برای مدیریت کسب‌وکار ورزشی خود جایگزین کنید.",

    feature1Title: "جایگزین دفترچه‌های دستی",

    feature1Description:
      "اطلاعات اعضا، برنامه‌های تمرینی و حضور و غیاب خود را دیجیتالی کنید و از گم شدن اطلاعات جلوگیری کنید.",

    feature2Title: "یادآوری‌های خودکار",

    feature2Description:
      "با ارسال یادآوری‌های خودکار، عدم حضور و پرداخت‌های دیرهنگام را کاهش دهید.",

    feature3Title: "گزارش‌های مالی",

    feature3Description:
      "درآمدها و هزینه‌های خود را پیگیری کنید و رشد کسب‌وکار خود را با نمودارهای ساده و قدرتمند بررسی کنید.",

    ctaTitle: "آماده پیشرفت هستید؟",

    ctaDescription:
      "به جمع مربیانی بپیوندید که از IronPulse برای مدیریت کسب‌وکار خود استفاده می‌کنند.",

    getStartedNow: "همین حالا شروع کنید",

    privacy: "حریم خصوصی",
    terms: "شرایط استفاده",
    contact: "تماس با ما",

    copyright: "© ۲۰۲۶ IronPulse. تمامی حقوق محفوظ است.",

    contactPageTitle: "تماس با ما",
    contactPageHeading: "چگونه می‌توانیم به شما کمک کنیم؟",
    contactPageDescription:
      "آیا درباره IronPulse، حساب کاربری، پرداخت‌ها یا امکانات مدیریت مربیان سوالی دارید؟ پیام خود را ارسال کنید تا تیم ما با شما تماس بگیرد.",

    getInTouch: "با ما در تماس باشید",
    getInTouchDescription:
      "ما اینجا هستیم تا به مربیان کمک کنیم زمان کمتری را صرف کارهای اداری و کاغذبازی کنند و زمان بیشتری را به مشتریان خود اختصاص دهند.",

    email: "ایمیل",
    phone: "تلفن",
    location: "موقعیت",

    sendMessageTitle: "پیام خود را برای ما ارسال کنید",
    messageSubmitted: "پیام شما با موفقیت ارسال شد.",

    name: "نام",
    yourName: "نام شما",
    subject: "موضوع",
    howCanWeHelp: "چگونه می‌توانیم کمک کنیم؟",
    message: "پیام",
    writeYourMessage: "پیام خود را بنویسید...",
    sendMessage: "ارسال پیام",

    backHome: "بازگشت به خانه",

    privacyPageTitle: "سیاست حفظ حریم خصوصی",
    lastUpdated: "آخرین بروزرسانی: اوت ۲۰۲۶",

    privacyIntro:
      "در IronPulse، ما به حریم خصوصی شما احترام می‌گذاریم و متعهد هستیم از اطلاعاتی که هنگام استفاده از پلتفرم در اختیار ما قرار می‌دهید محافظت کنیم.",

    privacySection1: "۱. اطلاعاتی که جمع‌آوری می‌کنیم",
    privacySection1Text1:
      "هنگام استفاده از IronPulse، ممکن است اطلاعاتی را که مستقیماً در اختیار ما قرار می‌دهید، از جمله نام، آدرس ایمیل، شماره تلفن، اطلاعات حساب کاربری و اطلاعات مربوط به باشگاه یا کسب‌وکار ورزشی شما جمع‌آوری کنیم.",
    privacySection1Text2:
      "همچنین ممکن است اطلاعاتی را که در نتیجه استفاده شما از پلتفرم ایجاد می‌شود، مانند فعالیت حساب، اطلاعات مدیریت اعضا، برنامه‌های تمرینی، سوابق مالی و تنظیمات سیستم جمع‌آوری کنیم.",

    privacySection2: "۲. نحوه استفاده از اطلاعات شما",
    privacySection2Text:
      "ما از اطلاعات جمع‌آوری‌شده برای ارائه، نگهداری و بهبود IronPulse و امکانات آن استفاده می‌کنیم.",
    privacySection2Bullet1: "ارائه و مدیریت حساب کاربری شما.",
    privacySection2Bullet2: "ارائه امکانات مدیریت باشگاه و مربی.",
    privacySection2Bullet3: "پردازش و مدیریت پرداخت‌ها در صورت نیاز.",
    privacySection2Bullet4: "ارسال اعلان‌های مهم مربوط به حساب کاربری.",
    privacySection2Bullet5: "ارائه خدمات پشتیبانی به مشتریان.",
    privacySection2Bullet6: "بهبود امنیت و قابلیت اطمینان پلتفرم.",

    privacySection3: "۳. امنیت اطلاعات",
    privacySection3Text1:
      "ما اقدامات فنی و سازمانی منطقی را برای محافظت از اطلاعات شما در برابر دسترسی غیرمجاز، تغییر، افشا یا نابودی انجام می‌دهیم.",
    privacySection3Text2:
      "با این حال، هیچ سرویس اینترنتی نمی‌تواند امنیت مطلق اطلاعات را تضمین کند.",

    privacySection4: "۴. اشتراک‌گذاری اطلاعات",
    privacySection4Text1: "ما اطلاعات شخصی شما را نمی‌فروشیم.",
    privacySection4Text2:
      "ممکن است اطلاعات را با ارائه‌دهندگان خدماتی که به ما در اجرای پلتفرم کمک می‌کنند، مانند خدمات میزبانی، احراز هویت، تحلیل داده، ایمیل، پرداخت یا ذخیره‌سازی، به اشتراک بگذاریم.",

    privacySection5: "۵. کوکی‌ها و فناوری‌های مشابه",
    privacySection5Text:
      "IronPulse ممکن است از کوکی‌ها یا فناوری‌های مشابه برای حفظ جلسات احراز هویت، به خاطر سپردن تنظیمات، بهبود عملکرد و درک نحوه تعامل کاربران با پلتفرم استفاده کند.",

    privacySection6: "۶. حقوق شما",
    privacySection6Text:
      "بسته به محل زندگی شما، ممکن است در رابطه با اطلاعات شخصی خود حقوقی داشته باشید؛ از جمله حق دسترسی، اصلاح، حذف یا درخواست یک نسخه از برخی اطلاعات.",

    privacySection7: "۷. نگهداری اطلاعات",
    privacySection7Text:
      "ما اطلاعات را تا زمانی که برای ارائه خدمات، رعایت تعهدات قانونی، حل اختلافات و اجرای توافقات ما به‌طور منطقی ضروری باشد، نگهداری می‌کنیم.",

    privacySection8: "۸. حریم خصوصی کودکان",
    privacySection8Text:
      "IronPulse برای کودکانی که طبق قوانین مربوطه مجاز به استفاده قانونی از این سرویس نیستند، طراحی نشده است.",

    privacySection9: "۹. تغییرات این سیاست",
    privacySection9Text:
      "ممکن است هر از گاهی این سیاست حفظ حریم خصوصی را به‌روزرسانی کنیم. در صورت ایجاد تغییرات، نسخه به‌روزشده این سیاست همراه با تاریخ جدید در همین صفحه منتشر خواهد شد.",

    privacySection10: "۱۰. تماس با ما",
    privacySection10Text:
      "اگر درباره این سیاست حفظ حریم خصوصی سوالی دارید، لطفاً از طریق صفحه تماس با ما ارتباط برقرار کنید.",

    contactIronPulse: "تماس با IronPulse ←",
    backHome: "بازگشت به خانه",

    // Terms & Conditions
    termsConditions: "شرایط و ضوابط",

    termsIntro:
      "این شرایط و ضوابط، دسترسی شما به پلتفرم IronPulse و نحوه استفاده شما از آن را تنظیم می‌کند.",

    terms1: "۱. پذیرش شرایط",
    terms1p1:
      "با ایجاد حساب کاربری یا استفاده از IronPulse، شما موافقت می‌کنید که از این شرایط و ضوابط پیروی کنید.",
    terms1p2:
      "اگر با این شرایط موافق نیستید، نباید از این پلتفرم استفاده کنید.",

    terms2: "۲. استفاده از پلتفرم",
    terms2p1:
      "IronPulse ابزارهایی را برای کمک به مربیان و کسب‌وکارهای ورزشی در مدیریت فعالیت‌ها، مشتریان، تمرین‌ها، پرداخت‌ها و اطلاعات مرتبط ارائه می‌دهد.",
    terms2p2:
      "شما موافقت می‌کنید که از این پلتفرم فقط برای اهداف قانونی و مطابق با این شرایط استفاده کنید.",

    terms3: "۳. مسئولیت‌های حساب کاربری",
    terms3p1: "شما مسئول حفظ محرمانگی اطلاعات ورود به حساب کاربری خود هستید.",
    terms3p2:
      "همچنین شما مسئول فعالیت‌هایی هستید که از طریق حساب شما انجام می‌شود و در صورت مشکوک شدن به دسترسی غیرمجاز، باید فوراً ما را مطلع کنید.",

    terms4: "۴. اطلاعات صحیح",
    terms4p1:
      "شما موافقت می‌کنید هنگام ایجاد و نگهداری حساب IronPulse، اطلاعات دقیق و به‌روز ارائه دهید.",

    terms5: "۵. فعالیت‌های ممنوع",
    terms5p1: "شما نباید از IronPulse برای موارد زیر استفاده کنید:",
    terms5li1: "نقض قوانین یا مقررات قابل اجرا.",
    terms5li2: "تلاش برای دسترسی غیرمجاز به پلتفرم.",
    terms5li3: "اختلال در عملکرد سرویس.",
    terms5li4: "آپلود نرم‌افزارهای مخرب یا محتوای مضر.",
    terms5li5: "سوءاستفاده یا استفاده نادرست از اطلاعات سایر کاربران.",
    terms5li6: "تلاش برای مهندسی معکوس بخش‌های محافظت‌شده سرویس.",

    terms6: "۶. محتوا و داده‌های کاربران",
    terms6p1:
      "شما همچنان مسئول اطلاعات و محتوایی هستید که در IronPulse وارد می‌کنید.",
    terms6p2:
      "شما باید اطمینان حاصل کنید که حقوق و مجوزهای لازم برای ذخیره و پردازش اطلاعاتی که از طریق پلتفرم ارائه می‌کنید را دارید.",

    terms7: "۷. پرداخت‌ها و اشتراک‌ها",
    terms7p1:
      "اگر IronPulse طرح‌های پولی، اشتراک‌ها یا سایر خدمات پولی را ارائه کند، ممکن است شرایط اضافی مربوط به قیمت‌گذاری و صورتحساب اعمال شود.",
    terms7p2:
      "هزینه‌های قابل اعمال، شرایط تمدید، قوانین لغو و الزامات پرداخت قبل از خرید به شما نمایش داده خواهد شد.",

    terms8: "۸. دسترسی به سرویس",
    terms8p1:
      "ما تلاش می‌کنیم IronPulse همیشه در دسترس و قابل اعتماد باشد، اما تضمین نمی‌کنیم که سرویس همیشه بدون وقفه، کاملاً امن یا بدون خطا باشد.",

    terms9: "۹. مالکیت فکری",
    terms9p1:
      "پلتفرم IronPulse، برند، نرم‌افزار، طراحی و مطالب مرتبط با آن تحت حمایت قوانین مربوط به مالکیت فکری قرار دارند.",
    terms9p2:
      "شما نمی‌توانید بخش‌های محافظت‌شده پلتفرم را بدون مجوز مناسب کپی، تغییر، توزیع یا به صورت تجاری مورد استفاده قرار دهید.",

    terms10: "۱۰. تعلیق یا خاتمه حساب",
    terms10p1:
      "ما ممکن است حساب‌هایی را که این شرایط را نقض می‌کنند، خطرات امنیتی ایجاد می‌کنند، مرتکب سوءاستفاده می‌شوند یا به شکل دیگری از پلتفرم سوءاستفاده می‌کنند، تعلیق یا خاتمه دهیم.",
    terms10p2:
      "شما می‌توانید در هر زمان استفاده از سرویس را متوقف کنید، مشروط به هرگونه تعهد اشتراکی یا قراردادی قابل اجرا.",

    terms11: "۱۱. سلب مسئولیت",
    terms11p1:
      "IronPulse به عنوان یک پلتفرم مدیریت و بهره‌وری ارائه می‌شود. اطلاعات و ابزارهای ارائه‌شده از طریق پلتفرم نباید به عنوان مشاوره حرفه‌ای حقوقی، مالی، پزشکی یا سایر مشاوره‌های تحت نظارت تلقی شوند.",

    terms12: "۱۲. محدودیت مسئولیت",
    terms12p1:
      "تا حدی که قوانین قابل اجرا اجازه می‌دهند، IronPulse و مدیران آن مسئول خسارات غیرمستقیم، اتفاقی، خاص یا تبعی ناشی از استفاده شما از پلتفرم نخواهند بود.",

    terms13: "۱۳. تغییرات این شرایط",
    terms13p1:
      "ممکن است با تغییرات پلتفرم، این شرایط و ضوابط را به‌روزرسانی کنیم. شرایط به‌روزشده همراه با تاریخ جدید در این صفحه منتشر خواهد شد.",

    terms14: "۱۴. تماس",
    terms14p1:
      "اگر درباره این شرایط و ضوابط سوالی دارید، از طریق صفحه تماس با ما ارتباط برقرار کنید.",

    contactIronPulse: "تماس با IronPulse →",

    // Forgot Password
    forgotPasswordTitle: "بازنشانی رمز عبور",
    forgotPasswordHeading: "رمز عبور خود را فراموش کرده‌اید؟",
    forgotPasswordDescription:
      "آدرس ایمیل مرتبط با حساب مربی خود را وارد کنید. ما یک کد تأیید برای بازنشانی رمز عبور شما ارسال خواهیم کرد.",

    emailAddress: "آدرس ایمیل",
    emailPlaceholder: "trainer@ironpulse.com",

    sendResetCode: "ارسال کد بازنشانی",
    sending: "در حال ارسال...",

    backToTrainerLogin: "بازگشت به ورود مربی",

    emailRequired: "وارد کردن آدرس ایمیل الزامی است.",
    invalidEmail: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",

    resetCodeSent: "اگر این ایمیل ثبت شده باشد، کد بازنشانی ارسال خواهد شد.",

    forgotPasswordError:
      "امکان پردازش درخواست شما وجود ندارد. لطفاً دوباره تلاش کنید.",

    // LOGIN PAGE

    trainerAccessPortal: "پنل ورود مربیان",

    emailAddress: "آدرس ایمیل",
    trainerEmailPlaceholder: "trainer@ironpulse.com",

    password: "رمز عبور",
    forgotPassword: "فراموش کرده‌اید؟",

    showPassword: "نمایش رمز عبور",
    hidePassword: "پنهان کردن رمز عبور",

    rememberDevice: "این دستگاه را به خاطر بسپار",

    secureLogin: "ورود امن",
    signingIn: "در حال ورود...",

    newTrainer: "مربی جدید هستید؟",
    requestAccess: "درخواست دسترسی",

    emailRequired: "آدرس ایمیل الزامی است",
    validEmail: "یک آدرس ایمیل معتبر وارد کنید",
    passwordRequired: "رمز عبور الزامی است",

    loginFailed: "ورود ناموفق بود",
    unableToLogin: "امکان ورود وجود ندارد",

    signupPageTitle: "ثبت‌نام پنل مربی",
    signupFullName: "نام کامل",
    signupEmailAddress: "آدرس ایمیل",
    signupPassword: "رمز عبور",
    signupConfirmPassword: "تأیید رمز عبور",

    signupNamePlaceholder: "جان دو",
    signupEmailPlaceholder: "trainer@ironpulse.com",
    signupPasswordPlaceholder: "••••••••",

    signupNameRequired: "نام کامل الزامی است",
    signupEmailRequired: "آدرس ایمیل الزامی است",
    signupEmailInvalid: "لطفاً یک آدرس ایمیل معتبر وارد کنید",
    signupPasswordRequired: "رمز عبور الزامی است",
    signupPasswordMinLength: "رمز عبور باید حداقل ۸ کاراکتر باشد",
    signupConfirmPasswordRequired: "لطفاً رمز عبور خود را تأیید کنید",
    signupPasswordsDoNotMatch: "رمزهای عبور مطابقت ندارند",

    signupCreatingAccount: "در حال ایجاد حساب...",
    signupCreateAccount: "ایجاد حساب",

    signupAlreadyHaveAccount: "قبلاً حساب کاربری دارید؟",
    signupLoginHere: "اینجا وارد شوید",

    signupHidePassword: "پنهان کردن رمز عبور",
    signupShowPassword: "نمایش رمز عبور",
    signupHideConfirmPassword: "پنهان کردن رمز عبور تأییدی",
    signupShowConfirmPassword: "نمایش رمز عبور تأییدی",

    signupUnableToCreateAccount: "ایجاد حساب امکان‌پذیر نیست",

    addMember: "افزودن عضو جدید",
    addMemberDescription: "جزئیات را برای ثبت یک عضو جدید باشگاه وارد کنید.",

    cancel: "لغو",

    basicInformation: "اطلاعات پایه",
    basicInformationDescription: "اطلاعات تماس عضو را وارد کنید.",

    fullName: "نام کامل",
    fullNamePlaceholder: "مثلاً: جان دو",

    phoneNumber: "شماره تلفن",
    phoneNumberPlaceholder: "(555) 000-0000",

    emailAddress: "آدرس ایمیل",
    emailPlaceholder: "john.doe@example.com",

    monthlyFee: "هزینه ماهانه",
    monthlyFeePlaceholder: "هزینه ماهانه را وارد کنید",

    membershipDetails: "جزئیات عضویت",
    membershipDetailsDescription: "تاریخ شروع عضویت عضو را تعیین کنید.",

    startDate: "تاریخ شروع",

    additionalInformation: "اطلاعات اضافی",
    additionalInformationDescription:
      "یادداشت‌های داخلی مربوط به این عضو را اضافه کنید.",

    internalNotes: "یادداشت‌های داخلی (اختیاری)",
    internalNotesPlaceholder: "اهداف، ترجیحات تمرینی یا یادداشت‌های عمومی...",

    saveMember: "ذخیره عضو",
    saving: "در حال ذخیره...",

    addMemberError: "افزودن عضو امکان‌پذیر نیست",

    bottomNav: {
      dashboard: "داشبورد",
      members: "اعضا",
      payments: "پرداخت‌ها",
      expenses: "مصارف",
      menu: "منو",
    },

    dashboardPage: {
      overview: "نمای کلی",
      totalMembers: "مجموع اعضا",
      activeMembers: "اعضای فعال",

      paidThisMonth: "پرداخت‌شده این ماه",
      ofMembersPaid: "درصد اعضای پرداخت‌کننده",

      unpaid: "پرداخت‌نشده",
      actionRequired: "نیاز به اقدام",

      monthlyRevenue: "درآمد ماهانه",
      expenses: "مصارف",

      revenueTrend: "روند درآمد",
      actualMemberPayments: "پرداخت‌های واقعی اعضا",

      thisMonth: "این ماه",
      lastMonth: "ماه گذشته",
      last3Months: "۳ ماه گذشته",
      last6Months: "۶ ماه گذشته",

      noRevenueData: "اطلاعاتی برای درآمد موجود نیست.",

      actionableUnpaid: "پرداخت‌های معوق",
      unpaidCount: "پرداخت‌نشده",
      allMembersPaid: "تمام اعضا هزینه این ماه را پرداخت کرده‌اند.",
      paymentDue: "موعد پرداخت",
      remind: "یادآوری",

      recentPayments: "پرداخت‌های اخیر",
      noPayments: "هیچ پرداختی در این ماه ثبت نشده است.",
    },

    dashboard: "داشبورد",
    members: "اعضا",
    expenses: "هزینه‌ها",
    profile: "پروفایل",
    elitePerformance: "عملکرد حرفه‌ای",
    addNewMember: "افزودن عضو جدید",
    logout: "خروج",
    openProfile: "باز کردن پروفایل",

    editMember: {
      back: "بازگشت",
      title: "ویرایش عضو",
      subtitle: "به‌روزرسانی اطلاعات عضو",

      member: "عضو",
      updateInformation: "اطلاعات زیر را به‌روزرسانی کنید",

      personalInformation: "اطلاعات شخصی",
      personalDescription: "اطلاعات اولیه عضو را به‌روزرسانی کنید.",

      fullName: "نام کامل",
      fullNamePlaceholder: "نام کامل را وارد کنید",

      phoneNumber: "شماره تلفن",
      phonePlaceholder: "شماره تلفن را وارد کنید",

      emailAddress: "آدرس ایمیل",
      emailPlaceholder: "آدرس ایمیل را وارد کنید",

      membershipInformation: "اطلاعات عضویت",
      membershipDescription: "جزئیات عضویت عضو را به‌روزرسانی کنید.",

      monthlyFee: "هزینه ماهانه",
      monthlyFeePlaceholder: "هزینه ماهانه را وارد کنید",

      startDate: "تاریخ شروع",

      cancel: "لغو",
      saveChanges: "ذخیره تغییرات",
      saving: "در حال ذخیره...",

      defaultMember: "عضو",

      getMemberError: "دریافت اطلاعات عضو امکان‌پذیر نیست",
      updateMemberError: "به‌روزرسانی عضو امکان‌پذیر نیست",
    },

    expensesPage: {
      title: "هزینه‌ها و وضعیت مالی",
      subtitle: "درآمد، هزینه‌ها و سود خالص باشگاه خود را مدیریت کنید.",

      financialOverview: "نمای کلی مالی",

      totalIncome: "مجموع درآمد",
      totalExpenses: "مجموع هزینه‌ها",
      netProfit: "سود خالص",

      income: "درآمد",
      expenses: "هزینه‌ها",

      memberPayments: "پرداخت‌های اعضا",
      actualMemberPayments: "پرداخت‌های واقعی دریافت‌شده از اعضا",

      otherExpenses: "سایر هزینه‌ها",
      otherExpensesDescription:
        "هزینه‌های اضافی باشگاه را اضافه و مدیریت کنید.",

      addExpense: "افزودن هزینه",
      addNewExpense: "افزودن هزینه جدید",

      expenseName: "نام هزینه",
      expenseNamePlaceholder: "مثلاً برق، کرایه، تجهیزات",

      expenseAmount: "مبلغ",
      expenseAmountPlaceholder: "مبلغ را وارد کنید",

      expenseDate: "تاریخ",
      expenseDatePlaceholder: "تاریخ را انتخاب کنید",

      expenseDescription: "توضیحات",
      expenseDescriptionPlaceholder: "توضیحات اختیاری...",

      saveExpense: "ذخیره هزینه",
      savingExpense: "در حال ذخیره...",

      cancel: "لغو",

      noExpenses: "هنوز هیچ هزینه‌ای ثبت نشده است.",
      noPayments: "هنوز هیچ پرداختی از اعضا ثبت نشده است.",

      recentExpenses: "هزینه‌های اخیر",
      recentPayments: "پرداخت‌های اخیر اعضا",

      deleteExpense: "حذف هزینه",
      editExpense: "ویرایش هزینه",

      deleteExpenseConfirm:
        "آیا مطمئن هستید که می‌خواهید این هزینه را حذف کنید؟",

      delete: "حذف",

      thisMonth: "این ماه",
      lastMonth: "ماه گذشته",
      thisYear: "امسال",

      total: "مجموع",

      incomeCalculation:
        "درآمد بر اساس پرداخت‌های واقعی دریافت‌شده از اعضا محاسبه می‌شود.",

      netProfitCalculation:
        "سود خالص از کم کردن مجموع هزینه‌ها از مجموع درآمد محاسبه می‌شود.",

      loading: "در حال دریافت اطلاعات مالی...",

      loadError: "دریافت اطلاعات مالی امکان‌پذیر نیست.",

      addExpenseError: "افزودن هزینه امکان‌پذیر نیست.",

      deleteExpenseError: "حذف هزینه امکان‌پذیر نیست.",

      expenseAdded: "هزینه با موفقیت اضافه شد.",

      expenseDeleted: "هزینه با موفقیت حذف شد.",

      requiredExpenseName: "نام هزینه الزامی است.",
      requiredExpenseAmount: "مبلغ هزینه الزامی است.",
      invalidExpenseAmount: "لطفاً یک مبلغ معتبر وارد کنید.",

      currency: "$",
    },

    memberCard: {
      paid: "پرداخت شده",
      unpaid: "پرداخت نشده",
      dueDate: "تاریخ پرداخت",
      paymentDue: "پرداخت سررسید شده",
      noPaymentYet: "هنوز پرداختی ثبت نشده است",
      editMember: "ویرایش عضو",
      recordPayment: "ثبت پرداخت",
      removeMember: "حذف عضو",
      actionsFor: "عملیات برای",
    },

    memberDetailsPage: {
      memberDetails: "جزئیات عضو",
      loading: "در حال بارگذاری...",
      memberNotFound: "عضو پیدا نشد",

      call: "تماس",
      email: "ایمیل",

      currentStatus: "وضعیت فعلی",
      paid: "پرداخت شده",
      unpaid: "پرداخت نشده",

      monthlyFee: "هزینه ماهانه",
      memberSince: "عضو از",

      paymentHistory: "تاریخچه پرداخت‌ها",
      previousMembershipPayments: "پرداخت‌های قبلی عضویت",

      month: "ماه",
      date: "تاریخ",
      amount: "مبلغ",
      status: "وضعیت",

      loadingPayments: "در حال بارگذاری پرداخت‌ها...",
      noPayments: "هنوز هیچ پرداختی ثبت نشده است.",

      recordNewPayment: "ثبت پرداخت جدید",
      paidStatus: "پرداخت شده",
    },

    membersPage: {
      dashboard: "داشبورد",
      members: "اعضا",
      profile: "پروفایل",
      expenses: "مصارف",

      memberDirectory: "فهرست اعضا",
      manageMembers:
        "اعضا را مدیریت کنید، وضعیت پرداخت‌ها را مشاهده کنید و فعالیت‌ها را پیگیری نمایید.",

      searchPlaceholder: "جستجو بر اساس نام، شماره تلفن یا ایمیل...",

      allMembers: "همه اعضا",
      paid: "پرداخت شده",
      unpaid: "پرداخت نشده",

      noMembersFound: "هیچ عضوی پیدا نشد.",
      clearSearch: "پاک کردن جستجو",

      addNewMember: "افزودن عضو جدید",

      removeMemberConfirm:
        "آیا مطمئن هستید که می‌خواهید این عضو را حذف کنید؟ این عملیات قابل بازگشت نیست.",

      unableToRemoveMember: "حذف عضو امکان‌پذیر نیست",
      memberRemoved: "عضو با موفقیت حذف شد",

      unableToGetMembers: "دریافت اعضا امکان‌پذیر نیست",
      paymentStatusError: "دریافت وضعیت پرداخت امکان‌پذیر نیست",

      paidStatus: "پرداخت شده",
      unpaidStatus: "پرداخت نشده",

      dueDate: "تاریخ پرداخت",
      paymentDue: "پرداخت سررسید شده",
      lastPayment: "آخرین پرداخت",
      noPaymentYet: "هنوز پرداختی انجام نشده است",
    },

    recordPaymentPage: {
      recordPayment: "ثبت پرداخت",
      processingManualTransaction: "در حال ثبت تراکنش دستی برای",
      member: "عضو",

      cancel: "لغو",

      billingPeriod: "دوره پرداخت",
      year: "سال",
      month: "ماه",
      done: "تأیید",

      amountCollected: "مبلغ دریافت‌شده",
      standardMonthlyFee: "هزینه استاندارد ماهانه اعمال می‌شود.",

      paymentMethod: "روش پرداخت",
      cash: "نقدی",
      card: "کارت",
      transfer: "انتقال",

      memberInformationMissing:
        "اطلاعات عضو موجود نیست. لطفاً به عقب برگردید و دوباره عضو را انتخاب کنید.",

      validPaymentAmount: "لطفاً یک مبلغ پرداخت معتبر وارد کنید.",

      unableToAddPayment: "امکان ثبت پرداخت وجود ندارد",

      paymentRecordingError: "هنگام ثبت پرداخت مشکلی پیش آمد.",

      confirmPayment: "تأیید پرداخت",

      months: {
        January: "جنوری",
        February: "فبروری",
        March: "مارچ",
        April: "آوریل",
        May: "می",
        June: "جون",
        July: "جولای",
        August: "آگست",
        September: "سپتامبر",
        October: "اکتبر",
        November: "نوامبر",
        December: "دسامبر",
      },
    },

    trainerProfilePage: {
      title: "پروفایل مربی",
      subtitle: "حساب کاربری و اطلاعات باشگاه خود را مدیریت کنید",

      gymTrainer: "مربی باشگاه",

      editProfile: "ویرایش پروفایل",
      cancelEdit: "لغو ویرایش",

      personalInformation: "اطلاعات شخصی",
      personalInformationDescription: "اطلاعات تماس شخصی شما.",

      fullName: "نام کامل",
      phoneNumber: "شماره تلفن",
      emailAddress: "آدرس ایمیل",

      about: "درباره",
      aboutPlaceholder: "کمی درباره خودتان برای اعضا بنویسید...",

      gymInformation: "اطلاعات باشگاه",
      gymInformationDescription: "اطلاعات مربوط به باشگاه شما.",

      gymName: "نام باشگاه",
      gymAddress: "آدرس باشگاه",

      saveChanges: "ذخیره تغییرات",
      saving: "در حال ذخیره...",

      security: "امنیت",
      securityDescription: "امنیت حساب کاربری خود را مدیریت کنید.",

      changePassword: "تغییر رمز عبور",
      updateYourAccountPassword: "رمز عبور حساب کاربری خود را به‌روزرسانی کنید",

      currentPassword: "رمز عبور فعلی",
      newPassword: "رمز عبور جدید",
      confirmNewPassword: "تأیید رمز عبور جدید",

      updatePassword: "به‌روزرسانی رمز عبور",
      updating: "در حال به‌روزرسانی...",
      cancel: "لغو",

      logout: "خروج از حساب",

      profileUpdatedSuccessfully: "پروفایل با موفقیت به‌روزرسانی شد.",
      newPasswordsDoNotMatch: "رمزهای عبور جدید مطابقت ندارند.",
      passwordMinimumLength: "رمز عبور باید حداقل ۶ کاراکتر داشته باشد.",

      unableToLoadProfile: "بارگذاری پروفایل امکان‌پذیر نیست",
      unableToUpdateProfile: "به‌روزرسانی پروفایل امکان‌پذیر نیست",
      unableToUploadImage: "آپلود تصویر امکان‌پذیر نیست",
      unableToUpdatePassword: "به‌روزرسانی رمز عبور امکان‌پذیر نیست",
      unableToLogout: "خروج از حساب امکان‌پذیر نیست",

      profileUpdateError: "هنگام به‌روزرسانی پروفایل مشکلی پیش آمد.",

      passwordChangedSuccessfully: "رمز عبور با موفقیت تغییر کرد.",

      somethingWentWrong: "هنگام پردازش درخواست شما مشکلی پیش آمد.",
    },
    installApp: "نصب برنامه",

    fitnessInformation: "معلومات تناسب اندام",
    fitnessInformationDescription:
      "معلومات فیزیکی و تناسب اندام عضو را اضافه کنید.",

    age: "سن",
    agePlaceholder: "سن را وارد کنید",

    height: "قد (cm)",
    heightPlaceholder: "مثلاً 175",

    weight: "وزن (kg)",
    weightPlaceholder: "مثلاً 70",

    exerciseType: "نوع تمرین",
    selectExerciseType: "نوع تمرین را انتخاب کنید",

    dietNutrition: "رژیم غذایی / تغذیه",
    dietPlaceholder: "مثلاً پروتین بالا، قند کم، گیاه‌خواری...",

    exerciseTypes: {
      gym: "باشگاه",
      fitness: "تناسب اندام",
      personalTraining: "تمرین شخصی",
      strengthTraining: "تمرین قدرتی",
      cardio: "کاردیو",
      weightLoss: "کاهش وزن",
      bodybuilding: "بدن‌سازی",
      other: "سایر",
    },

    physicalFitnessInformation: "معلومات فیزیکی و تناسب اندام این عضو",

    years: "سال",
    notAdded: "اضافه نشده",
    heightLabel: "قد",
    weightLabel: "وزن",
    exercise: "تمرین",

    noDietInformation: "معلومات رژیم غذایی اضافه نشده است",

    internalNotes: "یادداشت‌های داخلی",
    internalNotesPlaceholder:
      "یادداشت‌های خصوصی درباره این عضو، مانند اهداف، ترجیحات، نیازهای خاص یا سایر معلومات مهم را اضافه کنید.",

    unableToGetMember: "دریافت معلومات عضو امکان‌پذیر نبود",
    unableToGetPayments: "دریافت پرداخت‌ها امکان‌پذیر نبود",

    memberDetailsPage: {
      loading: "در حال بارگذاری معلومات عضو...",
      memberNotFound: "عضو پیدا نشد",
      memberDetails: "معلومات عضو",

      call: "تماس",
      email: "ایمیل",

      currentStatus: "وضعیت فعلی",
      paid: "پرداخت شده",
      unpaid: "پرداخت نشده",

      monthlyFee: "هزینه ماهانه",
      memberSince: "عضو از تاریخ",

      fitnessInformation: "معلومات تناسب اندام",
      physicalFitnessInformation: "معلومات فیزیکی و تناسب اندام این عضو",

      age: "سن",
      height: "قد",
      weight: "وزن",
      exercise: "تمرین",

      years: "سال",
      notAdded: "اضافه نشده",

      dietNutrition: "رژیم غذایی / تغذیه",
      noDietInformation: "معلومات رژیم غذایی اضافه نشده است",

      internalNotes: "یادداشت‌های داخلی",
      noInternalNotes: "یادداشت داخلی اضافه نشده است",

      paymentHistory: "تاریخچه پرداخت‌ها",
      previousMembershipPayments: "پرداخت‌های قبلی عضویت",

      month: "ماه",
      date: "تاریخ",
      amount: "مبلغ",
      status: "وضعیت",

      loadingPayments: "در حال بارگذاری تاریخچه پرداخت‌ها...",
      noPayments: "هنوز هیچ پرداختی ثبت نشده است",
      paidStatus: "پرداخت شده",

      recordNewPayment: "ثبت پرداخت جدید",
    },
  },

  // =========================================================
  // PASHTO / پښتو
  // =========================================================

  ps: {
    login: "ننوتل",
    getStarted: "پیل یې کړئ",

    builtForTrainers: "د مسلکي روزونکو لپاره جوړ شوی",

    heroTitle1: "خپل جیم مدیریت کړئ",
    heroTitleHighlight: "پرته له",
    heroTitle2: "کاغذي کارونو.",

    heroDescription:
      "خپل غړي مدیریت کړئ، پیسې راټولې کړئ او د خپل جیم مالي چارې د یوې ساده او پیاوړې سیستم له لارې تنظیم کړئ.",

    featuresLabel: "د مسلکي روزونکو لپاره جوړ شوی",

    featuresTitle: "هر څه چې د هوښیار مدیریت لپاره ورته اړتیا لرئ.",

    featuresDescription:
      "خپل زاړه کتابونه او خپاره شوي فایلونه د جیم د مدیریت له یوه پیاوړي سیستم سره بدل کړئ.",

    feature1Title: "د لاسي کتابونو بدیل",

    feature1Description:
      "د خپلو غړو معلومات، تمریني پلانونه او حاضري په ډیجیټل ډول مدیریت کړئ او د معلوماتو له ورکېدو څخه ځان وژغورئ.",

    feature2Title: "اتومات یادونې",

    feature2Description:
      "د اتومات یادونو له لارې غیرحاضري او ناوخته تادیات کم کړئ.",

    feature3Title: "مالي معلومات",

    feature3Description:
      "خپل عایدات او لګښتونه تعقیب کړئ او د ساده او پیاوړو چارتونو له لارې خپل پرمختګ وګورئ.",

    ctaTitle: "ایا د پرمختګ لپاره چمتو یاست؟",

    ctaDescription:
      "د هغو مسلکي روزونکو له شبکې سره یوځای شئ چې د IronPulse له لارې خپل کاروبارونه مدیریت کوي.",

    getStartedNow: "همدا اوس پیل کړئ",

    privacy: "محرمیت",
    terms: "شرایط",
    contact: "اړیکه",

    copyright: "© ۲۰۲۶ IronPulse. ټول حقوق خوندي دي.",

    contactPageTitle: "له موږ سره اړیکه",
    contactPageHeading: "څنګه درسره مرسته کولی شو؟",
    contactPageDescription:
      "ایا د IronPulse، خپل حساب، تادیاتو یا د روزونکو د مدیریت د ځانګړتیاوو په اړه پوښتنه لرئ؟ خپل پیغام راولېږئ او زموږ ټیم به له تاسو سره اړیکه ونیسي.",

    getInTouch: "له موږ سره اړیکه ونیسئ",
    getInTouchDescription:
      "موږ دلته یو ترڅو له روزونکو سره مرسته وکړو چې لږ وخت په کاغذي او اداري کارونو ولګوي او ډېر وخت خپلو مراجعینو ته ځانګړی کړي.",

    email: "برېښنالیک",
    phone: "تلیفون",
    location: "ځای",

    sendMessageTitle: "موږ ته پیغام راولېږئ",
    messageSubmitted: "ستاسو پیغام په بریالیتوب سره واستول شو.",

    name: "نوم",
    yourName: "ستاسو نوم",
    subject: "موضوع",
    howCanWeHelp: "څنګه درسره مرسته کولی شو؟",
    message: "پیغام",
    writeYourMessage: "خپل پیغام ولیکئ...",
    sendMessage: "پیغام واستوئ",

    backHome: "بېرته کور ته",

    privacyPageTitle: "د محرمیت تګلاره",
    lastUpdated: "وروستی تازه کول: اګست ۲۰۲۶",

    privacyIntro:
      "په IronPulse کې موږ ستاسو محرمیت ته درناوی کوو او ژمن یو چې هغه معلومات خوندي وساتو چې تاسو یې زموږ د پلاتفورم د کارولو پر مهال موږ سره شریکوئ.",

    privacySection1: "۱. هغه معلومات چې موږ یې راټولوو",
    privacySection1Text1:
      "کله چې تاسو IronPulse کاروئ، موږ ممکن هغه معلومات راټول کړو چې تاسو یې په مستقیم ډول موږ ته راکوئ، لکه ستاسو نوم، برېښنالیک، د تلیفون شمېره، د حساب معلومات او ستاسو د جیم یا روزنیز کاروبار اړوند معلومات.",
    privacySection1Text2:
      "موږ ممکن هغه معلومات هم راټول کړو چې د پلاتفورم ستاسو د کارولو له امله رامنځته کېږي، لکه د حساب فعالیت، د غړو د مدیریت معلومات، د تمرین پلانونه، مالي ریکارډونه او د سیستم تنظیمات.",

    privacySection2: "۲. موږ ستاسو معلومات څنګه کاروو",
    privacySection2Text:
      "موږ راټول شوي معلومات د IronPulse او د هغې د ځانګړتیاوو د وړاندې کولو، ساتنې او ښه کولو لپاره کاروو.",
    privacySection2Bullet1: "ستاسو حساب وړاندې او مدیریت کول.",
    privacySection2Bullet2: "د جیم او روزونکي د مدیریت امکانات وړاندې کول.",
    privacySection2Bullet3: "د اړتیا په صورت کې د تادیاتو پروسس او مدیریت کول.",
    privacySection2Bullet4: "د حساب اړوند مهم خبرتیاوې لېږل.",
    privacySection2Bullet5: "د پیرودونکو ملاتړ وړاندې کول.",
    privacySection2Bullet6: "د پلاتفورم امنیت او اعتبار ښه کول.",

    privacySection3: "۳. د معلوماتو امنیت",
    privacySection3Text1:
      "موږ مناسب تخنیکي او اداري اقدامات ترسره کوو ترڅو ستاسو معلومات د غیرمجاز لاسرسي، بدلون، افشا کېدو یا له منځه تلو څخه خوندي کړو.",
    privacySection3Text2:
      "خو هېڅ انټرنیټي خدمت نشي کولی د بشپړ امنیت تضمین وکړي.",

    privacySection4: "۴. د معلوماتو شریکول",
    privacySection4Text1: "موږ ستاسو شخصي معلومات نه پلورو.",
    privacySection4Text2:
      "موږ ممکن معلومات له هغو خدماتو وړاندې کوونکو سره شریک کړو چې زموږ د پلاتفورم په چلولو کې مرسته کوي، لکه د کوربه‌توب، احراز هویت، تحلیل، برېښنالیک، تادیاتو یا ذخیره کولو خدمتونه.",

    privacySection5: "۵. کوکیز او ورته ټکنالوژۍ",
    privacySection5Text:
      "IronPulse ممکن د کوکیز یا ورته ټکنالوژیو څخه د احراز هویت د ناستو ساتلو، د تنظیماتو د یاد ساتلو، د فعالیت د ښه کولو او د دې لپاره استفاده وکړي چې پوه شي کاروونکي له پلاتفورم سره څنګه تعامل کوي.",

    privacySection6: "۶. ستاسو حقوق",
    privacySection6Text:
      "ستاسو د موقعیت له مخې، تاسو ممکن د خپلو شخصي معلوماتو په اړه ځینې حقوق ولرئ، لکه معلوماتو ته د لاسرسي، اصلاح، حذف یا د ځینو معلوماتو د کاپي غوښتلو حق.",

    privacySection7: "۷. د معلوماتو ساتل",
    privacySection7Text:
      "موږ معلومات تر هغه وخته ساتو چې زموږ د خدماتو وړاندې کولو، قانوني مکلفیتونو پوره کولو، د شخړو حل کولو او زموږ د تړونونو د پلي کولو لپاره په مناسب ډول اړین وي.",

    privacySection8: "۸. د ماشومانو محرمیت",
    privacySection8Text:
      "IronPulse د هغو ماشومانو لپاره نه دی چې د اړوندو قوانینو له مخې د دې خدمت د قانوني کارولو اجازه نه لري.",

    privacySection9: "۹. په دې تګلاره کې بدلونونه",
    privacySection9Text:
      "موږ ممکن وخت په وخت دا د محرمیت تګلاره تازه کړو. کله چې بدلونونه رامنځته شي، تازه شوې تګلاره به د نوي تازه کولو له نېټې سره په همدې پاڼه کې خپره شي.",

    privacySection10: "۱۰. له موږ سره اړیکه",
    privacySection10Text:
      "که تاسو د دې محرمیت تګلارې په اړه کومه پوښتنه لرئ، مهرباني وکړئ زموږ د اړیکې له پاڼې څخه له موږ سره اړیکه ونیسئ.",

    contactIronPulse: "له IronPulse سره اړیکه ←",
    backHome: "بېرته کور ته",

    // Terms & Conditions
    termsConditions: "شرایط او مقررات",

    termsIntro:
      "دا شرایط او مقررات ستاسو د IronPulse پلاتفورم ته د لاسرسي او د هغې د کارولو طریقه تنظیموي.",

    terms1: "۱. د شرایطو منل",
    terms1p1:
      "د حساب په جوړولو یا د IronPulse په کارولو سره، تاسو موافق یاست چې له دې شرایطو او مقرراتو څخه پیروي وکړئ.",
    terms1p2:
      "که تاسو له دې شرایطو سره موافق نه یاست، نو باید له دې پلاتفورم څخه استفاده ونه کړئ.",

    terms2: "۲. د پلاتفورم کارول",
    terms2p1:
      "IronPulse داسې وسایل وړاندې کوي چې له روزونکو او د جیم له کاروبارونو سره د هغوی د فعالیتونو، مراجعینو، تمرینونو، تادیاتو او اړوندو معلوماتو په مدیریت کې مرسته کوي.",
    terms2p2:
      "تاسو موافق یاست چې له دې پلاتفورم څخه یوازې د قانوني موخو او د دې شرایطو مطابق استفاده وکړئ.",

    terms3: "۳. د حساب مسؤلیتونه",
    terms3p1: "تاسو د خپل حساب د ننوتلو معلوماتو د محرم ساتلو مسؤلیت لرئ.",
    terms3p2:
      "تاسو د خپل حساب له لارې د ترسره کېدونکو فعالیتونو مسؤلیت هم لرئ او که فکر کوئ چې ستاسو حساب ته غیرمجاز لاسرسی شوی، باید سمدستي موږ خبر کړئ.",

    terms4: "۴. دقیق معلومات",
    terms4p1:
      "تاسو موافق یاست چې د خپل IronPulse حساب د جوړولو او ساتلو پر مهال دقیق او تازه معلومات وړاندې کړئ.",

    terms5: "۵. منع شوي فعالیتونه",
    terms5p1: "تاسو نشئ کولی IronPulse د لاندې موخو لپاره وکاروئ:",
    terms5li1: "د اړوندو قوانینو یا مقرراتو ماتول.",
    terms5li2: "پلاتفورم ته د غیرمجاز لاسرسي هڅه کول.",
    terms5li3: "د خدمت په فعالیت کې مداخله کول.",
    terms5li4: "ناوړه سافټویر یا زیانمن محتوا اپلوډ کول.",
    terms5li5: "د بل کارونکي له معلوماتو څخه ناوړه استفاده یا غلط استعمال.",
    terms5li6: "د پلاتفورم د خوندي برخو د ریورس انجینرۍ هڅه کول.",

    terms6: "۶. د کاروونکي محتوا او معلومات",
    terms6p1:
      "تاسو د هغو معلوماتو او محتوا مسؤلیت لرئ چې IronPulse ته یې داخل کړئ.",
    terms6p2:
      "تاسو باید ډاډ ترلاسه کړئ چې د هغه معلوماتو د ذخیره کولو او پروسس کولو لپاره اړین حقوق او اجازه لرئ چې د پلاتفورم له لارې یې وړاندې کوئ.",

    terms7: "۷. تادیات او ګډونونه",
    terms7p1:
      "که IronPulse تادیه کېدونکي پلانونه، ګډونونه یا نور تادیه کېدونکي خدمات وړاندې کړي، نو ممکن د قیمت او بل ورکولو اضافي شرایط پلي شي.",
    terms7p2:
      "د تطبیق وړ فیسونه، د نوي کولو شرایط، د لغوه کولو قوانین او د تادیې اړتیاوې به د پیرودلو څخه مخکې وړاندې شي.",

    terms8: "۸. د خدمت شتون",
    terms8p1:
      "موږ هڅه کوو چې IronPulse تل موجود او د باور وړ وي، خو موږ تضمین نه کوو چې خدمت به تل پرته له وقفې، په بشپړ ډول خوندي او یا له تېروتنې پرته وي.",

    terms9: "۹. فکري ملکیت",
    terms9p1:
      "د IronPulse پلاتفورم، برانډ، سافټویر، ډیزاین او اړوند مواد د فکري ملکیت د اړوندو قوانینو له مخې خوندي دي.",
    terms9p2:
      "تاسو نشئ کولی د مناسبې اجازې پرته د پلاتفورم خوندي برخې کاپي، بدلې، وویشئ یا یې په سوداګریزه توګه وکاروئ.",

    terms10: "۱۰. د حساب ځنډول یا ختمول",
    terms10p1:
      "موږ ممکن هغه حسابونه وځنډوو یا ختم کړو چې له دې شرایطو څخه سرغړونه کوي، امنیتي خطرونه رامنځته کوي، ناوړه استفاده کوي یا له پلاتفورم څخه په بله ناسم ډول استفاده کوي.",
    terms10p2:
      "تاسو کولی شئ هر وخت د خدمت کارول ودروئ، خو د هر ډول پلي کېدونکو ګډون یا قراردادي مسؤلیتونو تابع به وي.",

    terms11: "۱۱. د مسؤلیت محدودیت",
    terms11p1:
      "IronPulse د مدیریت او تولید لپاره د یوه پلاتفورم په توګه وړاندې کېږي. هغه معلومات او وسایل چې د پلاتفورم له لارې وړاندې کېږي، باید د حقوقي، مالي، طبي یا نورو مسلکي مشورو په توګه ونه ګڼل شي.",

    terms12: "۱۲. د مسؤلیت محدودول",
    terms12p1:
      "تر هغه اندازې چې د اړوندو قوانینو له مخې اجازه وي، IronPulse او د هغې مسؤلین به ستاسو د پلاتفورم د کارولو له امله د غیرمستقیمو، تصادفي، ځانګړو یا پایله‌يي زیانونو مسؤلیت ونه لري.",

    terms13: "۱۳. په دې شرایطو کې بدلونونه",
    terms13p1:
      "موږ ممکن د پلاتفورم د بدلونونو له امله دا شرایط او مقررات تازه کړو. تازه شوي شرایط به په همدې پاڼه کې د نوي تازه کولو له نېټې سره خپاره شي.",

    terms14: "۱۴. اړیکه",
    terms14p1:
      "که تاسو د دې شرایطو او مقرراتو په اړه کومه پوښتنه لرئ، زموږ د اړیکې له پاڼې څخه له موږ سره اړیکه ونیسئ.",

    contactIronPulse: "له IronPulse سره اړیکه →",

    // Forgot Password
    forgotPasswordTitle: "د پټ نوم بیا تنظیمول",
    forgotPasswordHeading: "خپل پټ نوم مو هېر کړی؟",
    forgotPasswordDescription:
      "هغه برېښنالیک پته دننه کړئ چې ستاسو د روزونکي له حساب سره تړلې ده. موږ به تاسو ته د پټ نوم د بیا تنظیمولو لپاره د تایید کوډ واستوو.",

    emailAddress: "برېښنالیک پته",
    emailPlaceholder: "trainer@ironpulse.com",

    sendResetCode: "د بیا تنظیمولو کوډ واستوئ",
    sending: "لېږل کېږي...",

    backToTrainerLogin: "د روزونکي د ننوتلو پاڼې ته بېرته تلل",

    emailRequired: "د برېښنالیک پته اړینه ده.",
    invalidEmail: "مهرباني وکړئ یو معتبر برېښنالیک پته دننه کړئ.",

    resetCodeSent:
      "که دا برېښنالیک ثبت شوی وي، د بیا تنظیمولو کوډ به واستول شي.",

    forgotPasswordError:
      "ستاسو غوښتنه نه شي پروسس کېدای. مهرباني وکړئ بیا هڅه وکړئ.",

    // LOGIN PAGE

    trainerAccessPortal: "د روزونکي د ننوتلو پورتل",

    emailAddress: "د برېښنالیک پته",
    trainerEmailPlaceholder: "trainer@ironpulse.com",

    password: "پټ نوم",
    forgotPassword: "هېر شوی؟",

    showPassword: "پټ نوم ښکاره کړئ",
    hidePassword: "پټ نوم پټ کړئ",

    rememberDevice: "دا وسیله په یاد وساتئ",

    secureLogin: "خوندي ننوتل",
    signingIn: "د ننوتلو په حال کې...",

    newTrainer: "نوی روزونکی یاست؟",
    requestAccess: "د لاسرسي غوښتنه",

    emailRequired: "د برېښنالیک پته اړینه ده",
    validEmail: "یو معتبر برېښنالیک پته دننه کړئ",
    passwordRequired: "پټ نوم اړین دی",

    loginFailed: "ننوتل ناکام شول",
    unableToLogin: "ننوتل ممکن نه دي",

    signupPageTitle: "د روزونکي پورټل ثبت‌نام",
    signupFullName: "بشپړ نوم",
    signupEmailAddress: "د برېښنالیک پته",
    signupPassword: "پټنوم",
    signupConfirmPassword: "د پټنوم تایید",

    signupNamePlaceholder: "جان دو",
    signupEmailPlaceholder: "trainer@ironpulse.com",
    signupPasswordPlaceholder: "••••••••",

    signupNameRequired: "بشپړ نوم اړین دی",
    signupEmailRequired: "د برېښنالیک پته اړینه ده",
    signupEmailInvalid: "مهرباني وکړئ یو معتبر برېښنالیک پته دننه کړئ",
    signupPasswordRequired: "پټنوم اړین دی",
    signupPasswordMinLength: "پټنوم باید لږ تر لږه ۸ کرکټرونه ولري",
    signupConfirmPasswordRequired: "مهرباني وکړئ خپل پټنوم تایید کړئ",
    signupPasswordsDoNotMatch: "پټنومونه سره مطابقت نه لري",

    signupCreatingAccount: "حساب جوړېږي...",
    signupCreateAccount: "حساب جوړ کړئ",

    signupAlreadyHaveAccount: "لا دمخه حساب لرئ؟",
    signupLoginHere: "دلته ننوتل",

    signupHidePassword: "پټنوم پټ کړئ",
    signupShowPassword: "پټنوم ښکاره کړئ",
    signupHideConfirmPassword: "د تایید پټنوم پټ کړئ",
    signupShowConfirmPassword: "د تایید پټنوم ښکاره کړئ",

    signupUnableToCreateAccount: "حساب جوړول ممکن نه دي",

    addMember: "نوی غړی اضافه کړئ",
    addMemberDescription: "د نوي جیم غړي د ثبتولو لپاره معلومات دننه کړئ.",

    cancel: "لغوه",

    basicInformation: "اساسي معلومات",
    basicInformationDescription: "د غړي د اړیکې معلومات دننه کړئ.",

    fullName: "بشپړ نوم",
    fullNamePlaceholder: "لکه: جان دو",

    phoneNumber: "د تلیفون شمېره",
    phoneNumberPlaceholder: "(555) 000-0000",

    emailAddress: "د برېښنالیک پته",
    emailPlaceholder: "john.doe@example.com",

    monthlyFee: "میاشتنی فیس",
    monthlyFeePlaceholder: "میاشتنی فیس دننه کړئ",

    membershipDetails: "د غړیتوب معلومات",
    membershipDetailsDescription: "د غړي د غړیتوب د پیل نېټه وټاکئ.",

    startDate: "د پیل نېټه",

    additionalInformation: "اضافي معلومات",
    additionalInformationDescription:
      "د دې غړي په اړه داخلي یادښتونه اضافه کړئ.",

    internalNotes: "داخلي یادښتونه (اختیاري)",
    internalNotesPlaceholder: "موخې، د تمرین خوښې یا عمومي یادښتونه...",

    saveMember: "غړی خوندي کړئ",
    saving: "خوندي کېږي...",

    addMemberError: "د غړي اضافه کول ممکن نه دي",

    bottomNav: {
      dashboard: "ډشبورډ",
      members: "غړي",
      payments: "تادیات",
      expenses: "مصارف",
      menu: "مینو",
    },

    dashboardPage: {
      overview: "عمومي کتنه",

      totalMembers: "د غړو ټول شمېر",
      activeMembers: "فعال غړي",

      paidThisMonth: "پدې میاشت کې تادیه شوي",
      ofMembersPaid: "د غړو څخه تادیه شوي",

      unpaid: "نه دي تادیه شوي",
      actionRequired: "اقدام ته اړتیا ده",

      monthlyRevenue: "میاشتنی عاید",
      expenses: "مصارف",

      revenueTrend: "د عاید بهیر",
      actualMemberPayments: "د غړو حقیقي تادیات",

      thisMonth: "دا میاشت",
      lastMonth: "تېره میاشت",
      last3Months: "تېرې ۳ میاشتې",
      last6Months: "تېرې ۶ میاشتې",

      noRevenueData: "د عاید معلومات شتون نلري.",

      actionableUnpaid: "د تادیې پاتې غړي",
      unpaidCount: "نه دي تادیه کړي",
      allMembersPaid: "ټولو غړو د دې میاشتې فیس تادیه کړی دی.",
      paymentDue: "د تادیې نېټه",
      remind: "یادونه",

      recentPayments: "وروستي تادیات",
      noPayments: "پدې میاشت کې هېڅ تادیه نه ده ثبت شوې.",
    },

    dashboard: "ډشبورډ",
    members: "غړي",
    expenses: "لګښتونه",
    profile: "پروفایل",
    elitePerformance: "مسلکي فعالیت",
    addNewMember: "نوی غړی اضافه کړئ",
    logout: "وتل",
    openProfile: "پروفایل پرانیزئ",

    editMember: {
      back: "بېرته",
      title: "د غړي سمون",
      subtitle: "د غړي معلومات تازه کړئ",

      member: "غړی",
      updateInformation: "لاندې معلومات تازه کړئ",

      personalInformation: "شخصي معلومات",
      personalDescription: "د غړي اساسي معلومات تازه کړئ.",

      fullName: "بشپړ نوم",
      fullNamePlaceholder: "بشپړ نوم ولیکئ",

      phoneNumber: "د تلیفون شمېره",
      phonePlaceholder: "د تلیفون شمېره ولیکئ",

      emailAddress: "برېښنالیک",
      emailPlaceholder: "برېښنالیک ولیکئ",

      membershipInformation: "د غړیتوب معلومات",
      membershipDescription: "د غړي د غړیتوب جزئیات تازه کړئ.",

      monthlyFee: "میاشتنی فیس",
      monthlyFeePlaceholder: "میاشتنی فیس ولیکئ",

      startDate: "د پیل نېټه",

      cancel: "لغوه",
      saveChanges: "بدلونونه خوندي کړئ",
      saving: "خوندي کېږي...",

      defaultMember: "غړی",

      getMemberError: "د غړي معلومات ترلاسه کول ممکن نه دي",
      updateMemberError: "د غړي تازه کول ممکن نه دي",
    },

    expensesPage: {
      title: "لګښتونه او مالي کتنه",
      subtitle: "د خپل جیم عایدات، لګښتونه او خالصه ګټه مدیریت کړئ.",

      financialOverview: "مالي کتنه",

      totalIncome: "ټول عاید",
      totalExpenses: "ټول لګښتونه",
      netProfit: "خالصه ګټه",

      income: "عاید",
      expenses: "لګښتونه",

      memberPayments: "د غړو تادیات",
      actualMemberPayments: "له غړو څخه ترلاسه شوي حقیقي تادیات",

      otherExpenses: "نور لګښتونه",
      otherExpensesDescription: "د جیم اضافي لګښتونه اضافه او مدیریت کړئ.",

      addExpense: "لګښت اضافه کړئ",
      addNewExpense: "نوی لګښت اضافه کړئ",

      expenseName: "د لګښت نوم",
      expenseNamePlaceholder: "لکه: برېښنا، کرایه، تجهیزات",

      expenseAmount: "مبلغ",
      expenseAmountPlaceholder: "مبلغ دننه کړئ",

      expenseDate: "نېټه",
      expenseDatePlaceholder: "نېټه وټاکئ",

      expenseDescription: "توضیحات",
      expenseDescriptionPlaceholder: "اختیاري توضیحات...",

      saveExpense: "لګښت خوندي کړئ",
      savingExpense: "خوندي کېږي...",

      cancel: "لغوه",

      noExpenses: "تر اوسه هېڅ لګښت نه دی ثبت شوی.",
      noPayments: "تر اوسه د غړو هېڅ تادیه نه ده ثبت شوې.",

      recentExpenses: "وروستي لګښتونه",
      recentPayments: "د غړو وروستي تادیات",

      deleteExpense: "لګښت حذف کړئ",
      editExpense: "لګښت سم کړئ",

      deleteExpenseConfirm: "ایا ډاډه یاست چې غواړئ دا لګښت حذف کړئ؟",

      delete: "حذف",

      thisMonth: "دا میاشت",
      lastMonth: "تېره میاشت",
      thisYear: "سږ کال",

      total: "ټول",

      incomeCalculation:
        "عاید د غړو څخه د ترلاسه شوو حقیقي تادیاتو پر بنسټ محاسبه کېږي.",

      netProfitCalculation:
        "خالصه ګټه د ټول عاید څخه د ټولو لګښتونو په کمولو سره محاسبه کېږي.",

      loading: "د مالي معلوماتو د ترلاسه کولو په حال کې...",

      loadError: "د مالي معلوماتو ترلاسه کول ممکن نه دي.",

      addExpenseError: "د لګښت اضافه کول ممکن نه دي.",

      deleteExpenseError: "د لګښت حذف کول ممکن نه دي.",

      expenseAdded: "لګښت په بریالیتوب سره اضافه شو.",

      expenseDeleted: "لګښت په بریالیتوب سره حذف شو.",

      requiredExpenseName: "د لګښت نوم اړین دی.",
      requiredExpenseAmount: "د لګښت مبلغ اړین دی.",
      invalidExpenseAmount: "مهرباني وکړئ یو معتبر مبلغ دننه کړئ.",

      currency: "$",
    },

    memberCard: {
      paid: "پرداخت شده",
      unpaid: "پرداخت نشده",
      dueDate: "تاریخ پرداخت",
      paymentDue: "پرداخت سررسید شده",
      noPaymentYet: "هنوز پرداختی ثبت نشده است",
      editMember: "ویرایش عضو",
      recordPayment: "ثبت پرداخت",
      removeMember: "حذف عضو",
      actionsFor: "عملیات برای",
    },

    memberDetailsPage: {
      memberDetails: "د غړي معلومات",
      loading: "د بارولو په حال کې...",
      memberNotFound: "غړی پیدا نه شو",

      call: "زنګ",
      email: "برېښنالیک",

      currentStatus: "اوسنی حالت",
      paid: "ورکړل شوی",
      unpaid: "نه دی ورکړل شوی",

      monthlyFee: "میاشتنی فیس",
      memberSince: "غړیتوب له",

      paymentHistory: "د تادیاتو تاریخچه",
      previousMembershipPayments: "د غړیتوب پخوانۍ تادیې",

      month: "میاشت",
      date: "نېټه",
      amount: "مبلغ",
      status: "حالت",

      loadingPayments: "د تادیاتو د بارولو په حال کې...",
      noPayments: "تر اوسه هېڅ تادیه ثبت شوې نه ده.",

      recordNewPayment: "نوې تادیه ثبت کړئ",
      paidStatus: "ورکړل شوی",
    },

    membersPage: {
      dashboard: "ډشبورډ",
      members: "غړي",
      profile: "پروفایل",
      expenses: "لګښتونه",

      memberDirectory: "د غړو لېست",
      manageMembers:
        "غړي مدیریت کړئ، د تادیاتو حالت وګورئ او فعالیتونه تعقیب کړئ.",

      searchPlaceholder: "د نوم، تلیفون شمېرې یا برېښنالیک له مخې لټون...",

      allMembers: "ټول غړي",
      paid: "تادیه شوی",
      unpaid: "تادیه شوی نه دی",

      noMembersFound: "هیڅ غړی پیدا نه شو.",
      clearSearch: "لټون پاک کړئ",

      addNewMember: "نوی غړی اضافه کړئ",

      removeMemberConfirm:
        "ایا تاسو ډاډه یاست چې غواړئ دا غړی حذف کړئ؟ دا عمل بېرته نه شي راګرځېدلی.",

      unableToRemoveMember: "د غړي حذف کول ممکن نه دي",
      memberRemoved: "غړی په بریالیتوب سره حذف شو",

      unableToGetMembers: "د غړو ترلاسه کول ممکن نه دي",
      paymentStatusError: "د تادیې حالت ترلاسه کول ممکن نه دي",

      paidStatus: "تادیه شوی",
      unpaidStatus: "تادیه شوی نه دی",

      dueDate: "د تادیې نېټه",
      paymentDue: "تادیه پاتې ده",
      lastPayment: "وروستۍ تادیه",
      noPaymentYet: "تر اوسه هېڅ تادیه نه ده شوې",
    },

    recordPaymentPage: {
      recordPayment: "د پیسو ثبتول",
      processingManualTransaction: "د لاندې غړي لپاره لاسي معامله ثبتېږي:",
      member: "غړی",

      cancel: "لغوه",

      billingPeriod: "د تادیې موده",
      year: "کال",
      month: "میاشت",
      done: "بشپړ",

      amountCollected: "ترلاسه شوې پیسې",
      standardMonthlyFee: "د میاشتې معیاري فیس تطبیقېږي.",

      paymentMethod: "د تادیې طریقه",
      cash: "نغدې",
      card: "کارت",
      transfer: "لېږد",

      memberInformationMissing:
        "د غړي معلومات نشته. مهرباني وکړئ بېرته لاړ شئ او غړی بیا انتخاب کړئ.",

      validPaymentAmount: "مهرباني وکړئ د تادیې لپاره یو معتبر مبلغ دننه کړئ.",

      unableToAddPayment: "د تادیې ثبتول ممکن نه دي",

      paymentRecordingError: "د تادیې د ثبتولو پر مهال یوه ستونزه رامنځته شوه.",

      confirmPayment: "تادیه تایید کړئ",

      months: {
        January: "جنوري",
        February: "فبروري",
        March: "مارچ",
        April: "اپرېل",
        May: "مې",
        June: "جون",
        July: "جولای",
        August: "اګست",
        September: "سپټمبر",
        October: "اکتوبر",
        November: "نومبر",
        December: "ډسمبر",
      },
    },

    trainerProfilePage: {
      title: "د روزونکي پروفایل",
      subtitle: "خپل حساب او د جم معلومات مدیریت کړئ",

      gymTrainer: "د جم روزونکی",

      editProfile: "پروفایل سمول",
      cancelEdit: "د سمون لغوه کول",

      personalInformation: "شخصي معلومات",
      personalInformationDescription: "ستاسو شخصي د اړیکې معلومات.",

      fullName: "بشپړ نوم",
      phoneNumber: "د تلیفون شمېره",
      emailAddress: "د برېښنالیک پته",

      about: "زموږ په اړه",
      aboutPlaceholder: "غړو ته د خپل ځان په اړه لږ معلومات ولیکئ...",

      gymInformation: "د جم معلومات",
      gymInformationDescription: "ستاسو د جم اړوند معلومات.",

      gymName: "د جم نوم",
      gymAddress: "د جم پته",

      saveChanges: "بدلونونه خوندي کړئ",
      saving: "خوندي کېږي...",

      security: "امنیت",
      securityDescription: "د خپل حساب امنیت مدیریت کړئ.",

      changePassword: "پټ نوم بدل کړئ",
      updateYourAccountPassword: "د خپل حساب پټ نوم تازه کړئ",

      currentPassword: "اوسنی پټ نوم",
      newPassword: "نوی پټ نوم",
      confirmNewPassword: "د نوي پټ نوم تایید",

      updatePassword: "پټ نوم تازه کړئ",
      updating: "تازه کېږي...",
      cancel: "لغوه",

      logout: "له حساب څخه وتل",

      profileUpdatedSuccessfully: "پروفایل په بریالیتوب سره تازه شو.",
      newPasswordsDoNotMatch: "نوي پټ نومونه سره سمون نه لري.",
      passwordMinimumLength: "پټ نوم باید لږ تر لږه ۶ توري ولري.",

      unableToLoadProfile: "پروفایل نه شي پورته کېدای",
      unableToUpdateProfile: "پروفایل نه شي تازه کېدای",
      unableToUploadImage: "انځور نه شي پورته کېدای",
      unableToUpdatePassword: "پټ نوم نه شي تازه کېدای",
      unableToLogout: "له حساب څخه وتل ممکن نه دي",

      profileUpdateError: "د پروفایل د تازه کولو پر مهال ستونزه رامنځته شوه.",

      passwordChangedSuccessfully: "پټ نوم په بریالیتوب سره بدل شو.",

      somethingWentWrong: "ستاسو د غوښتنې د پروسس پر مهال ستونزه رامنځته شوه.",
    },
    installApp: "اپلیکیشن نصب کړئ",
  },

  fitnessInformation: "د فټنس معلومات",
  fitnessInformationDescription: "د غړي فزیکي او د فټنس معلومات اضافه کړئ.",

  age: "عمر",
  agePlaceholder: "عمر ولیکئ",

  height: "قد (cm)",
  heightPlaceholder: "لکه 175",

  weight: "وزن (kg)",
  weightPlaceholder: "لکه 70",

  exerciseType: "د تمرین ډول",
  selectExerciseType: "د تمرین ډول وټاکئ",

  dietNutrition: "خواړه / تغذیه",
  dietPlaceholder: "لکه لوړ پروټین، کم بوره، سبزیجاتي خواړه...",

  exerciseTypes: {
    gym: "جم",
    fitness: "فټنس",
    personalTraining: "شخصي تمرین",
    strengthTraining: "د ځواک تمرین",
    cardio: "کاردیو",
    weightLoss: "د وزن کمول",
    bodybuilding: "بدن جوړونه",
    other: "نور",
  },

  physicalFitnessInformation: "د دې غړي فزیکي او د فټنس معلومات",

  years: "کاله",
  notAdded: "نه دی اضافه شوی",
  heightLabel: "قد",
  weightLabel: "وزن",
  exercise: "تمرین",

  noDietInformation: "د خوړو معلومات نه دي اضافه شوي",

  internalNotes: "داخلي یادښتونه",
  internalNotesPlaceholder:
    "د دې غړي په اړه شخصي یادښتونه، لکه موخې، خوښې، ځانګړې اړتیاوې یا نور مهم معلومات ولیکئ.",

  unableToGetMember: "د غړي معلومات ترلاسه نه شول",
  unableToGetPayments: "د تادیاتو معلومات ترلاسه نه شول",

  memberDetailsPage: {
    loading: "د غړي معلومات لوډېږي...",
    memberNotFound: "غړی پیدا نه شو",
    memberDetails: "د غړي معلومات",

    call: "زنګ",
    email: "ایمیل",

    currentStatus: "اوسنی حالت",
    paid: "تادیه شوی",
    unpaid: "تادیه نه ده شوې",

    monthlyFee: "میاشتنی فیس",
    memberSince: "غړیتوب له",

    fitnessInformation: "د فټنس معلومات",
    physicalFitnessInformation: "د دې غړي فزیکي او د فټنس معلومات",

    age: "عمر",
    height: "قد",
    weight: "وزن",
    exercise: "تمرین",

    years: "کاله",
    notAdded: "نه دی اضافه شوی",

    dietNutrition: "خواړه / تغذیه",
    noDietInformation: "د خوړو معلومات نه دي اضافه شوي",

    internalNotes: "داخلي یادښتونه",
    noInternalNotes: "داخلي یادښتونه نه دي اضافه شوي",

    paymentHistory: "د تادیاتو تاریخچه",
    previousMembershipPayments: "د غړیتوب پخوانۍ تادیې",

    month: "میاشت",
    date: "نېټه",
    amount: "مقدار",
    status: "حالت",

    loadingPayments: "د تادیاتو تاریخچه لوډېږي...",
    noPayments: "تر اوسه هېڅ تادیه نه ده ثبت شوې",
    paidStatus: "تادیه شوی",

    recordNewPayment: "نوې تادیه ثبت کړئ",
  },
};

// =========================================================
// CREATE CONTEXT
// =========================================================

const LanguageContext = createContext();

// =========================================================
// LANGUAGE PROVIDER
// =========================================================

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // =========================================================
  // CHANGE PAGE LANGUAGE + DIRECTION
  // =========================================================

  useEffect(() => {
    localStorage.setItem("language", language);

    // English = Left to Right
    // Persian + Pashto = Right to Left

    if (language === "en") {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    } else if (language === "fa") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "fa";
    } else if (language === "ps") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ps";
    }
  }, [language]);

  // Get translations for current language

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// =========================================================
// CUSTOM HOOK
// =========================================================

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};
