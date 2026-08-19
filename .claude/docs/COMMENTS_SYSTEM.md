# Comments System Documentation

## Overview
The CriaTuHandmade website features a comprehensive comment system that allows users to leave comments on the main page, with support for replies, pagination, and admin management.

## Features

### User Features
- ✅ **Post Comments** - Users can leave comments with their name
- ✅ **Reply to Comments** - Users can reply to existing comments
- ✅ **Content Moderation** - Automatic filtering of inappropriate content
- ✅ **Pagination** - Comments are paginated for better performance
- ✅ **Real-time Updates** - Comments refresh automatically after posting

### Admin Features
- ✅ **Comment Management Dashboard** - View all comments in admin panel
- ✅ **Filter Comments** - Filter by All, Unresolved, or Resolved
- ✅ **Visual Status Indicators** - Clear badges showing comment status
- ✅ **Quick Reply** - Admins can reply directly from the dashboard
- ✅ **Mark as Resolved** - Comments can be marked as resolved without needing a reply
- ✅ **Delete Comments/Replies** - Full control over comment deletion
- ✅ **Statistics** - View total, unresolved, and resolved comment counts
- ✅ **Attention Alerts** - Visual indicators for comments needing attention

## Architecture

### Frontend (Angular)
- **Comments Component** (`angular/src/app/comments/`)
  - Displays comments with pagination
  - Handles user comment submission
  - Manages reply functionality
  - Content moderation integration

- **Admin Component** (`angular/src/app/admin/`)
  - Comments management tab
  - Filter controls
  - Quick reply functionality
  - Status management

### Backend Options

#### Option 1: MongoDB (Netlify Functions)
- **File**: `angular/netlify/functions/comments.js`
- **Database**: MongoDB Atlas
- **Deployment**: Netlify Serverless Functions

#### Option 2: PostgreSQL (.NET API)
- **Controller**: `dotnet/Controllers/CommentController.cs`
- **Repository**: `dotnet/Data/CommentRepository.cs`
- **Entities**: 
  - `CommentModel.cs`
  - `ReplyModel.cs`
- **Database**: PostgreSQL with EF Core

## Data Models

### Comment
```typescript
{
  id: number | string,
  userName: string,
  content: string,
  createdAt: Date,
  isResolved: boolean,
  hasAdminReply: boolean,
  resolvedAt?: Date,
  resolvedByAdmin?: string,
  replies: Reply[],
  replyCount: number
}
```

### Reply
```typescript
{
  id: number | string,
  commentId: number | string,
  userName: string,
  content: string,
  createdAt: Date,
  isAdmin: boolean
}
```

## API Endpoints

### GET /comments
Fetch comments with pagination and filtering
**Query Parameters:**
- `page` (number, default: 1)
- `pageSize` (number, default: 10)
- `isResolved` (boolean, optional)

**Response:**
```json
{
  "comments": [...],
  "totalCount": 100,
  "unresolvedCount": 15,
  "currentPage": 1,
  "pageSize": 10,
  "totalPages": 10
}
```

### GET /comments/:id
Get a single comment by ID

### POST /comments
Create a new comment
**Body:**
```json
{
  "userName": "John Doe",
  "content": "Great products!"
}
```

### POST /comments/:id/replies
Add a reply to a comment
**Body:**
```json
{
  "userName": "Admin",
  "content": "Thank you!",
  "isAdmin": true
}
```

### PUT /comments/:id/resolve
Mark a comment as resolved
**Body:**
```json
{
  "adminName": "Admin"
}
```

### DELETE /comments/:id
Delete a comment and all its replies

### DELETE /comments/replies/:replyId
Delete a specific reply

### GET /comments/stats
Get comment statistics
**Response:**
```json
{
  "totalComments": 100,
  "unresolvedComments": 15,
  "resolvedComments": 85,
  "needsAttention": 15
}
```

## Content Moderation

The comment system includes the same content moderation as the live chat:

### Blocked Content
- **Profanity** - 65+ banned words and phrases
- **Bullying Patterns** - 12 pattern matchers
- **Threats** - Violence and threatening language
- **Discrimination** - Hate speech and slurs
- **Business Attacks** - Scams, fraud accusations
- **Excessive Caps/Punctuation** - Spam prevention

### User Experience
- Messages are validated before submission
- Clear warning messages explain why content was blocked
- Input is cleared on blocked attempts
- Users can rephrase and resubmit

See [CHAT_CONTENT_MODERATION.md](../CHAT_CONTENT_MODERATION.md) for full details.

## Admin Panel Usage

### Accessing Comments
1. Login to admin panel (admin/admin123)
2. Click the **Comments** tab
3. View badge showing unresolved comment count

### Comment Status Indicators

#### Visual Badges
- **🟡 Needs Attention** - No admin reply and not resolved
- **🔵 Replied** - Admin has replied but not marked resolved
- **🟢 Resolved** - Comment is marked as resolved

#### Color Coding
- **Yellow Border** - Comments needing attention
- **Blue Border** - Unresolved comments with admin reply
- **Gray Border** - Resolved comments

### Filter Options
- **All Comments** - View everything
- **Unresolved** - Comments not marked as resolved (shows badge count)
- **Resolved** - Completed comments

### Admin Actions

#### Quick Reply
1. Type response in the quick reply box
2. Click "Reply" button
3. Reply is automatically marked as from Admin
4. Comment's `hasAdminReply` flag is set to true

#### Mark as Resolved
- Click the **green checkmark** button
- Use when no reply is necessary
- Comment is marked with resolved date and admin name

#### Delete Comment
- Click the **red delete** button
- Confirms before deletion
- Deletes comment and ALL replies

#### Delete Reply
- Click small delete icon on reply
- Confirms before deletion
- Updates `hasAdminReply` flag if last admin reply removed

## Pagination

### User-Facing Comments
- **Page Size**: 10 comments
- **Navigation**: Previous/Next buttons + page numbers
- **Display**: Shows X of Y comments

### Admin Panel
- **Page Size**: 20 comments
- **Navigation**: Previous/Next with page counter
- **Filtering**: Pagination resets when changing filters

## Integration with Home Page

### Location
Comments section appears at the bottom of the home page, after the live chat.

### Display
```html
<app-comments></app-comments>
```

### Styling
- Matches CriaTuHandmade pink theme
- Responsive design
- Clean card-based layout
- Smooth animations

## Deployment

### Netlify (MongoDB)
1. Ensure `MONGODB_URI` is set in Netlify environment variables
2. Deploy `comments.js` function automatically with site
3. Comments collection created automatically on first use

### .NET Backend (PostgreSQL)
1. Apply migration: `dotnet ef database update`
2. Ensure connection string in `appsettings.json`
3. Deploy to hosting platform (Docker/Cloud)

## Security Considerations

### Input Validation
- All content is validated for inappropriate language
- Maximum length limits enforced
- SQL injection prevention (parameterized queries)
- XSS prevention (Angular sanitization)

### Authentication
- Admin actions require authentication
- Admin status tracked in replies
- No public admin functions exposed

### Rate Limiting
Consider implementing:
- Comment submission throttling
- IP-based rate limits
- CAPTCHA for excessive posting

## Future Enhancements

### Planned Features
- [ ] Email notifications for new comments
- [ ] User avatars/profiles
- [ ] Upvote/downvote system
- [ ] Nested replies (multi-level)
- [ ] Rich text editor
- [ ] Image attachments
- [ ] Search functionality
- [ ] Export comments to CSV/PDF

### Technical Improvements
- [ ] Real-time updates with WebSockets
- [ ] Caching layer for performance
- [ ] Advanced spam detection (ML)
- [ ] Comment editing functionality
- [ ] Soft delete with recovery
- [ ] Comment flagging by users

## Troubleshooting

### Comments Not Loading
1. Check API endpoint is accessible
2. Verify MongoDB/PostgreSQL connection
3. Check browser console for errors
4. Verify CORS headers

### Comments Not Submitting
1. Check content moderation rules
2. Verify API endpoint accepts POST
3. Check network tab for request details
4. Ensure all required fields filled

### Admin Panel Not Showing Comments
1. Verify authentication
2. Check API service methods
3. Ensure `loadComments()` is called
4. Check browser console for errors

### Pagination Not Working
1. Verify page numbers calculated correctly
2. Check API returns correct total count
3. Ensure pagination component receives data
4. Check for off-by-one errors

## Code Examples

### Creating a Comment (User)
```typescript
const comment: CreateComment = {
  userName: 'John Doe',
  content: 'Love your handmade items!'
};

this.apiService.createComment(comment).subscribe({
  next: (result) => console.log('Comment posted'),
  error: (err) => console.error('Error:', err)
});
```

### Replying as Admin
```typescript
const reply: CreateReply = {
  userName: 'Admin',
  content: 'Thank you for your support!',
  isAdmin: true
};

this.apiService.createReply(commentId, reply).subscribe({
  next: () => this.loadComments(),
  error: (err) => console.error('Error:', err)
});
```

### Resolving a Comment
```typescript
this.apiService.resolveComment(commentId, 'Admin').subscribe({
  next: () => {
    this.showSuccess('Comment resolved');
    this.loadComments();
  }
});
```

## Testing

### Manual Testing Checklist
- [ ] Submit comment as user
- [ ] Reply to comment as user
- [ ] Reply to comment as admin
- [ ] Mark comment as resolved
- [ ] Delete comment
- [ ] Delete reply
- [ ] Test pagination (create 15+ comments)
- [ ] Test filtering (all/unresolved/resolved)
- [ ] Test content moderation (try banned word)
- [ ] Test empty submissions
- [ ] Test very long content
- [ ] Test special characters

### Test Data
Use these test comments:
1. "Great products! Love the craftsmanship"
2. "How long does shipping take?"
3. "Beautiful handmade items, highly recommend!"
4. "Can you make custom orders?"

## Performance Considerations

### Database Indexing
- Index `createdAt` for sorting
- Index `isResolved` for filtering
- Index `hasAdminReply` for admin queries
- Compound index on `(isResolved, hasAdminReply)`

### Query Optimization
- Use pagination to limit results
- Lazy load replies when needed
- Cache statistics
- Implement query result caching

### Frontend Performance
- Virtual scrolling for large lists
- Debounce filter changes
- Optimize re-renders
- Lazy load comment component

---

**Last Updated**: April 19, 2026  
**Version**: 1.0  
**Maintainer**: CriaTuHandmade Development Team
