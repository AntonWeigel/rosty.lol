# aSaaSin Project Rules

## Package Manager

**ALWAYS use `yarn`** for package management. Never use `npm`.

```bash
# ✅ CORRECT
yarn add <package>
yarn add -D <package>
yarn remove <package>
yarn install

# ❌ INCORRECT
npm install <package>
npm uninstall <package>
```

## Tailwind CSS v4

This project uses **Tailwind CSS v4**. Use v4-compatible syntax only.

### CSS Variable Syntax in Arbitrary Values
```tsx
// ✅ CORRECT (v4)
w-[var(--sidebar-width)]
max-w-[var(--custom-var)]

// ❌ INCORRECT (v3 syntax, broken in v4)
w-[--sidebar-width]
max-w-[--custom-var]
```

### Deprecated Classes (use v4 equivalents)
| Deprecated (v3) | Use Instead (v4) |
|-----------------|------------------|
| `outline-none` | `outline-hidden` |
| `shadow-sm` | `shadow-xs` |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `rounded-sm` | `rounded-xs` |
| `data-[disabled]` | `data-disabled` |

### theme() Function is Deprecated
```tsx
// ✅ CORRECT (v4) - use explicit values
w-[calc(var(--sidebar-width-icon)_+_1rem)]

// ❌ INCORRECT (v3) - theme() doesn't work in v4
w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]
```

## Color System

### Custom Color Tokens
This project uses custom colors defined in `constants/colors.ts`. **ALWAYS** use these color tokens in Tailwind classes:

**Available Colors:**
- `highlight` - Primary accent color (RGB: 122 92 250)
- `neutral` - Neutral gray (RGB: 184 190 201)
- `primary-dark` - Main dark color (RGB: 31 33 44)
- `secondary-dark` - Secondary dark color (RGB: 44 46 58)
- `primary-light` - Main light color (RGB: 245 245 245)
- `secondary-light` - Secondary light color (RGB: 235 235 235)
- `success` - Success state color (RGB: 58 157 122)
- `destructive` - Error/destructive state color (RGB: 222 82 69)

### Rules for Using Colors in Tailwind

1. **NEVER use default Tailwind colors** (e.g., `bg-blue-500`, `text-red-600`)
2. **ALWAYS use custom color tokens** with Tailwind utilities:
   - Text: `text-highlight`, `text-primary-dark`, etc.
   - Background: `bg-secondary-light`, `bg-primary-dark`, etc.
   - Border: `border-highlight`, `border-neutral`, etc.
   - With opacity: `bg-highlight/50`, `text-primary-dark/70`, etc.

3. **Example Usage:**
   ```tsx
   // ✅ CORRECT
   <div className="bg-secondary-light text-primary-dark border-highlight">
   <Button className="bg-highlight hover:bg-highlight/80">
   <Progress className="bg-secondary-dark/10" />

   // ❌ INCORRECT
   <div className="bg-gray-100 text-gray-900 border-blue-500">
   <Button className="bg-blue-600 hover:bg-blue-700">
   <Progress className="bg-gray-200" />
   ```

## UI Component Standards

### 1. Component Library
- **ALWAYS use shadcn/ui components** via `npx shadcn@latest add [component]`
- **NEVER implement Radix UI primitives directly** - always use the shadcn wrapper
- **Customize shadcn components** to use project color tokens after installation

### 2. Component Patterns
- Follow existing component patterns from the Habit system
- Use similar file structure and naming conventions
- Maintain consistency in state management (SWR, React hooks)
- Follow the established service layer pattern

### 3. Dialog/Modal Components
- Use shadcn `Dialog` and `AlertDialog` components
- Size variants: `sm` (360px), `default` (540px), `lg` (720px)
- Always include `DialogHeader`, `DialogTitle`, `DialogDescription`
- Use `TransitionButton` for form submissions with pending states

## Architecture Patterns

### 1. File Structure
```
/services/[feature]/        # Service layer (database operations)
/hooks/use[Feature].ts       # SWR hooks for data fetching
/components/[Feature]/       # Feature-specific components
/app/actions.ts              # Server actions
```

### 2. Server Actions
- Always validate with Zod schemas
- Use `getCurrentUser()` for authentication
- Return `ActionResponse` type
- Handle errors with toast notifications
- Include Co-Authored-By in commits: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

### 3. Data Fetching
- Use SWR for client-side data fetching
- Server components fetch initial data and pass as props
- Use optimistic updates for better UX
- Implement proper error handling with toast notifications

### 4. Database Layer
- All tables must have RLS (Row Level Security) policies
- Use `auth.uid() = user_id` pattern for user isolation
- Include `updated_at` triggers using `moddatetime` extension
- Implement CASCADE deletes for related data
- Separate storage buckets per feature (e.g., `habit-images`, `goal-images`)

## TypeScript Standards

### 1. Type Definitions
- Define types in `types/index.ts`
- Use Zod schemas in `types/schemas.ts` for validation
- Export enums from `constants/enums.ts`
- Prefer `type` over `interface` for object shapes

### 2. Type Safety
- No `any` types - use proper typing
- Use type inference where possible
- Define explicit return types for exported functions
- Use const assertions for literal types

## Styling Standards

### 1. Tailwind Classes
- Use custom color tokens (see Color System above)
- Prefer utility classes over custom CSS
- Use responsive prefixes: `md:`, `lg:`, etc.
- Group classes logically: layout → spacing → colors → states

### 2. Animation & Transitions
- Use `transition-all duration-300 ease-in-out` for smooth transitions
- Implement hover states with `hover:` prefix
- Use `group` and `group-hover:` for parent-child interactions

## Naming Conventions

### 1. Files
- Components: PascalCase (e.g., `GoalList.tsx`)
- Services: camelCase (e.g., `fetchGoals.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useGoals.ts`)

### 2. Variables & Functions
- React components: PascalCase
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types: PascalCase
- Enums: PascalCase

## Commit Message Format

```
<type>: <subject>

<body with bullet points of changes>

<footer with technical details>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Types:** `feat`, `fix`, `refactor`, `style`, `docs`, `chore`

## Testing & Validation

### Before Committing
1. Verify all Tailwind classes use custom color tokens
2. Ensure shadcn components are properly installed
3. Check TypeScript compiles without errors
4. Test CRUD operations work correctly
5. Verify RLS policies are in place
6. Test private mode functionality (Shift + P)

## Common Patterns

### Form Handling
```tsx
const [isPending, startTransition] = React.useTransition();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  startTransition(async () => {
    const result = await someAction(formData);
    if (result.success) {
      toast({ title: 'Success', variant: 'success' });
      mutate(SWRKey.Something);
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  });
};
```

### SWR Hook Pattern
```tsx
export const useSomething = (initialData: Type[] = []) => {
  const { data, error, mutate, isLoading } = useSWR<Type[]>(
    SWRKey.Something,
    fetchSomething,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: initialData,
    },
  );

  return { items: data || [], error, mutate, isLoading };
};
```

## Key Reminders

1. **Colors**: Only use custom tokens from `constants/colors.ts`
2. **Components**: Always use shadcn/ui, never raw Radix UI
3. **Patterns**: Follow existing Habit system architecture
4. **Security**: Always implement RLS policies
5. **UX**: Use optimistic updates and toast notifications
