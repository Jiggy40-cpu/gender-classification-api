# Gender Classification API

A serverless API endpoint that integrates with the Genderize API to classify names by gender with confidence scoring.

##  Overview

This API provides a single endpoint that:
- Accepts a name query parameter
- Calls the Genderize API to predict gender
- Processes and returns structured data with confidence metrics
- Handles errors gracefully with appropriate HTTP status codes

## Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jiggy40-cpu/gender-classification-api.git
cd gender-classification-api