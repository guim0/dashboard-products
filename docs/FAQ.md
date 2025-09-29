# FAQ & Troubleshooting Guide

## Frequently Asked Questions

### General Questions

#### Q: What is Dashboard Products?
**A:** Dashboard Products is a modern project management system built with Next.js that allows you to track projects across multiple companies. It features beautiful data visualizations, GitHub OAuth authentication, and a responsive design that works on all devices.

#### Q: Do I need a GitHub account to use the application?
**A:** While GitHub OAuth is the recommended authentication method, the application also provides a demo credentials option (username: "Jonh", password: "nextauth") for testing purposes.

#### Q: Is my data saved permanently?
**A:** Currently, the application uses mock data that persists only during your session. When you refresh the page or restart the application, the data resets to the default state. This is by design for the demonstration version.

#### Q: Can I use this application commercially?
**A:** Yes, this is an open-source project available under the MIT License. You can modify and use it for commercial purposes, but you'll need to integrate a real database for persistent data storage.

### Authentication Questions

#### Q: Why does GitHub OAuth fail sometimes?
**A:** Common reasons include:
- **Network connectivity issues**: Check your internet connection
- **Browser blocking popups**: Allow popups for the application domain
- **GitHub service outage**: Check GitHub's status page
- **Incorrect OAuth configuration**: Verify the client ID and secret in environment variables

#### Q: How do I set up GitHub OAuth for development?
**A:** Follow these steps:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App with these settings:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env.local` file

#### Q: What happens if I deny GitHub permissions?
**A:** If you deny permissions during OAuth, you'll be redirected back to the login page. You can try again or use the demo credentials instead.

#### Q: How long do sessions last?
**A:** Sessions are managed by NextAuth.js and typically last for 30 days unless you explicitly log out or clear your browser data.

### Project Management Questions

#### Q: How many projects can I create?
**A:** There's no hard limit on the number of projects you can create during a session. However, since data is stored in memory, creating thousands of projects might impact performance.

#### Q: Can I edit or delete projects after creating them?
**A:** Currently, the application supports creating and viewing projects. Edit and delete functionality would be added in future versions along with persistent data storage.

#### Q: What do the progress charts represent?
**A:** The progress charts show monthly data with desktop and mobile metrics. These represent different aspects of project progress and are generated with realistic mock data for demonstration purposes.

#### Q: Why are all projects assigned to "Ayrton Senna"?
**A:** This is part of the mock data system. In a real implementation, you would have a database of actual team members to assign as project managers.

### Technical Questions

#### Q: What technologies power this application?
**A:** The main technologies include:
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js with GitHub OAuth
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form for form management

#### Q: Is the application mobile-friendly?
**A:** Yes, the application is built with a mobile-first responsive design. It adapts to different screen sizes and provides touch-friendly interfaces on mobile devices.

#### Q: Can I run this application offline?
**A:** The application requires an internet connection for authentication and initial loading. However, once loaded, basic functionality works offline until you need to authenticate again.

#### Q: How do I report bugs or request features?
**A:** You can:
- Open an issue on the GitHub repository
- Contact the developer via LinkedIn or email
- Submit a pull request with fixes or improvements

## Troubleshooting Guide

### Authentication Issues

#### Problem: "Sign in failed" error message
**Symptoms**: Error message appears when trying to log in with GitHub OAuth

**Solutions**:
1. **Check network connection**: Ensure stable internet connectivity
2. **Clear browser cache**: Clear cookies and cache for the application domain
3. **Try incognito mode**: Test in a private/incognito browser window
4. **Verify OAuth setup**: Check that GitHub OAuth app is configured correctly
5. **Check console errors**: Open browser developer tools for detailed error messages

#### Problem: Credentials login doesn't work
**Symptoms**: "Invalid credentials" message when using demo account

**Solutions**:
1. **Verify credentials**: Use exactly "Jonh" (username) and "nextauth" (password)
2. **Check caps lock**: Ensure caps lock is off
3. **Clear form**: Refresh page and try again
4. **Browser compatibility**: Try a different browser

#### Problem: Session expires frequently
**Symptoms**: Constantly being logged out

**Solutions**:
1. **Check system clock**: Ensure your computer's date/time is correct
2. **Browser settings**: Check if cookies are blocked
3. **Antivirus/security software**: Temporarily disable to test
4. **Clear session data**: Log out completely and log in again

### Project Creation Issues

#### Problem: Form validation errors
**Symptoms**: Red error messages appear on form fields

**Solutions**:
1. **Required fields**: Fill all required fields (marked with *)
2. **Date validation**: Ensure end date is after start date
3. **Character limits**: Keep description under 500 characters
4. **Name length**: Project name must be at least 3 characters
5. **Responsible selection**: Select a manager from the dropdown

#### Problem: "Create Project" button is disabled
**Symptoms**: Button appears grayed out and unclickable

**Solutions**:
1. **Authentication required**: Log in first before creating projects
2. **Session expired**: Log out and log in again
3. **JavaScript disabled**: Enable JavaScript in browser settings
4. **Page not fully loaded**: Wait for page to finish loading

#### Problem: Modal doesn't open
**Symptoms**: Clicking "Create Project" does nothing

**Solutions**:
1. **JavaScript errors**: Check browser console for errors
2. **Browser compatibility**: Update to latest browser version
3. **Ad blockers**: Temporarily disable ad blocking extensions
4. **Popup blockers**: Allow popups for the application

### Display Issues

#### Problem: Charts don't display
**Symptoms**: Empty spaces where charts should appear

**Solutions**:
1. **Refresh page**: Simple page refresh often resolves chart issues
2. **Browser compatibility**: Update browser to latest version
3. **JavaScript enabled**: Ensure JavaScript is enabled
4. **Extensions**: Disable browser extensions that might interfere
5. **Screen resolution**: Try different screen resolution/zoom level

#### Problem: Layout looks broken
**Symptoms**: Elements overlap or appear misaligned

**Solutions**:
1. **Browser zoom**: Reset browser zoom to 100%
2. **Clear cache**: Clear browser cache and cookies
3. **CSS conflicts**: Disable browser extensions
4. **Update browser**: Use latest browser version
5. **Screen size**: Test on different screen sizes

#### Problem: Text is too small/large
**Symptoms**: Text appears inappropriately sized

**Solutions**:
1. **Browser zoom**: Adjust browser zoom level
2. **System scaling**: Check system display scaling settings
3. **Font settings**: Reset browser font settings to default
4. **Accessibility**: Use browser accessibility features

### Performance Issues

#### Problem: Application loads slowly
**Symptoms**: Long loading times, especially on first visit

**Solutions**:
1. **Internet connection**: Check network speed and stability
2. **Clear cache**: Clear browser cache and restart
3. **Close tabs**: Close unnecessary browser tabs
4. **Restart browser**: Completely restart the browser
5. **Disable extensions**: Temporarily disable browser extensions

#### Problem: Animations are choppy
**Symptoms**: Stuttering or jerky animations

**Solutions**:
1. **Hardware acceleration**: Enable hardware acceleration in browser
2. **Close applications**: Close other resource-intensive applications
3. **Update drivers**: Update graphics drivers
4. **Reduce effects**: Disable browser animation effects
5. **Restart computer**: Restart to clear memory

#### Problem: Memory usage is high
**Symptoms**: Browser becomes slow or unresponsive

**Solutions**:
1. **Refresh page**: Reload the application
2. **Close tabs**: Keep only necessary tabs open
3. **Restart browser**: Complete browser restart
4. **Clear data**: Clear browsing data and cache
5. **Check RAM**: Ensure sufficient system memory

### Data Issues

#### Problem: Project data disappears
**Symptoms**: Created projects no longer visible

**Solutions**:
1. **Expected behavior**: Data resets on page refresh (by design)
2. **Session expired**: Log in again if session expired
3. **Browser crash**: Data is lost if browser crashed
4. **Storage limits**: Browser storage may be full

#### Problem: Incorrect progress data
**Symptoms**: Charts show unexpected or nonsensical data

**Solutions**:
1. **Mock data**: Remember this is demonstration data, not real metrics
2. **Refresh data**: Reload page to regenerate mock data
3. **Browser compatibility**: Ensure browser supports modern JavaScript

## Browser-Specific Issues

### Chrome
**Common Issues**:
- Extensions blocking authentication
- Strict security settings preventing OAuth

**Solutions**:
- Test in incognito mode
- Disable extensions temporarily
- Check site permissions

### Firefox
**Common Issues**:
- Enhanced tracking protection blocking requests
- Strict cookie policies

**Solutions**:
- Add site to exceptions list
- Adjust privacy settings
- Enable third-party cookies for the site

### Safari
**Common Issues**:
- Intelligent tracking prevention
- Cross-site request blocking

**Solutions**:
- Disable intelligent tracking prevention for the site
- Enable cross-site tracking
- Update to latest Safari version

### Edge
**Common Issues**:
- SmartScreen blocking access
- Compatibility mode issues

**Solutions**:
- Add site to trusted sites
- Disable compatibility mode
- Check SmartScreen settings

## Mobile-Specific Issues

### iOS Safari
**Common Issues**:
- OAuth redirects not working
- Form inputs not focusing properly

**Solutions**:
- Update iOS to latest version
- Clear Safari cache
- Try refreshing the page

### Android Chrome
**Common Issues**:
- Touch targets too small
- Layout issues in landscape mode

**Solutions**:
- Use portrait mode for forms
- Zoom in for better touch precision
- Update Chrome app

## Development Issues

### Environment Setup
**Problem**: Build fails or environment variables not recognized

**Solutions**:
1. **File naming**: Ensure file is named `.env.local` exactly
2. **File location**: Place in project root directory
3. **Syntax**: Use proper environment variable syntax
4. **Restart server**: Restart development server after changes
5. **Check spelling**: Verify variable names match exactly

### Dependencies
**Problem**: npm install fails or packages have conflicts

**Solutions**:
1. **Clear cache**: Run `npm cache clean --force`
2. **Delete node_modules**: Remove and reinstall dependencies
3. **Update npm**: Update to latest npm version
4. **Check Node version**: Ensure Node.js 18+ is installed
5. **Network issues**: Check internet connection

### Build Issues
**Problem**: Production build fails

**Solutions**:
1. **Type errors**: Fix all TypeScript compilation errors
2. **Missing dependencies**: Ensure all dependencies are installed
3. **Environment variables**: Set production environment variables
4. **Clear .next**: Delete .next folder and rebuild
5. **Memory limits**: Increase Node.js memory limit if needed

## Getting Help

### Self-Help Resources
1. **Browser Console**: Check for JavaScript errors
2. **Network Tab**: Monitor network requests and responses
3. **Application Tab**: Inspect cookies and local storage
4. **Documentation**: Review the comprehensive documentation
5. **GitHub Issues**: Search existing issues for solutions

### Contact Options
- **GitHub Issues**: Report bugs and request features
- **LinkedIn**: [guim0-dev](https://www.linkedin.com/in/guim0-dev)
- **Email**: guimodev@gmail.com

### When Contacting for Help
Please provide:
1. **Browser and version**
2. **Operating system**
3. **Steps to reproduce the issue**
4. **Error messages or console logs**
5. **Screenshots if applicable**

### Emergency Fallbacks
If the application is completely inaccessible:
1. Try a different browser
2. Clear all browser data
3. Try from a different device/network
4. Use the deployed version instead of local development
5. Check if GitHub services are operational

## Known Limitations

### Current Version Limitations
- **Data Persistence**: Projects are not saved permanently
- **User Management**: No multi-user support
- **Project Editing**: Cannot edit projects after creation
- **File Uploads**: No file attachment capability
- **Real-time Updates**: No real-time collaboration features

### Browser Limitations
- **Internet Explorer**: Not supported
- **Older Mobile Browsers**: Limited functionality on very old mobile browsers
- **JavaScript Required**: Application requires JavaScript to function

### Performance Limitations
- **Large Datasets**: Performance may degrade with hundreds of projects
- **Concurrent Users**: Not optimized for many simultaneous users
- **Mobile Performance**: May be slower on older mobile devices

These limitations are by design for the demonstration version and would be addressed in a production implementation with proper backend infrastructure.