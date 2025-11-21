# Contributing to Gifted Air

Thank you for your interest in contributing to Gifted Air! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- MongoDB (Atlas or local)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/GiftedAir2.git
   cd GiftedAir2
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and API keys
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your API URL
   npm run dev
   ```

## 📝 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   # Frontend
   cd frontend
   npm run lint
   npm run build
   
   # Backend
   cd backend
   npm run lint
   npm start
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Convention

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add bulk gift ordering feature
fix: resolve payment processing error
docs: update README with deployment instructions
```

## 🔍 Code Style Guidelines

### JavaScript/React

- Use ES6+ features
- Prefer functional components with hooks
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use custom CSS only when necessary

### File Organization

- Components in `frontend/src/components/`
- Pages in `frontend/src/pages/`
- Utilities in `frontend/src/utils/`
- Backend routes in `backend/routes/`
- Models in `backend/models/`

## 🧪 Testing

Currently, the project doesn't have automated tests. When adding tests:

- Write unit tests for utilities and helpers
- Write integration tests for API endpoints
- Test edge cases and error handling

## 📦 Pull Request Process

1. **Update documentation** if needed
2. **Ensure CI/CD passes** - All GitHub Actions workflows must pass
3. **Request review** from maintainers
4. **Address feedback** promptly
5. **Squash commits** if requested

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Changes are tested locally
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No console.log statements in production code
- [ ] CI/CD workflows pass

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## 💡 Feature Requests

We welcome feature requests! Please:

- Check if the feature already exists
- Describe the use case clearly
- Explain why it would be valuable
- Consider implementation complexity

## 🔐 Security

If you discover a security vulnerability:

- **DO NOT** open a public issue
- Email the maintainers directly
- Provide detailed information
- Allow time for a fix before disclosure

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what's best for the project

## 📞 Getting Help

- Open an issue for bugs or questions
- Check existing documentation
- Review closed issues for similar problems

Thank you for contributing to Gifted Air! 🌿✨
