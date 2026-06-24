import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ComputerIcon,
  Delete02Icon,
  Moon02Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTheme, type Theme } from "@/hooks/use-theme";

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),
  email: z
    .email("Enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
});

type ProfileValues = z.infer<typeof profileSchema>;

const THEMES: { value: Theme; label: string; icon: typeof Sun01Icon }[] = [
  { value: "light", label: "Light", icon: Sun01Icon },
  { value: "dark", label: "Dark", icon: Moon02Icon },
  { value: "system", label: "System", icon: ComputerIcon },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [savedAt, setSavedAt] = React.useState<string | null>(null);
  const [deleted, setDeleted] = React.useState(false);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@acme.com",
    },
    mode: "onBlur",
  });

  const [firstName, lastName] = useWatch({
    control: form.control,
    name: ["firstName", "lastName"],
  });
  const fullName =
    `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Your account";
  const initials =
    ((firstName?.[0] ?? "") + (lastName?.[0] ?? "")).trim() || "?";

  function onSubmit(values: ProfileValues) {
    // No backend in this sandbox - simulate a successful save.
    setSavedAt(new Date().toLocaleTimeString());
    form.reset(values);
  }

  const activeTheme = THEMES.find((t) => t.value === theme) ?? THEMES[2];

  return (
    <>
      <Head>
        <title>Account settings</title>
      </Head>

      {/* Skip link - visually hidden until focused via keyboard. */}
      <a
        href="#main-content"
        className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:not-sr-only focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-16">
        <nav aria-label="Breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              strokeWidth={2}
              aria-hidden="true"
              className="size-4"
            />
            Back to dashboard
          </Link>
        </nav>

        <header className="flex items-center gap-4">
          <Avatar size="lg">
            {/* Intentionally unresolvable src so the fallback initials render. */}
            <AvatarImage
              src="/avatar.png"
              alt={`Profile photo of ${fullName}`}
            />
            <AvatarFallback aria-hidden="true" className="text-base">
              {initials.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-heading text-xl font-semibold tracking-tight">
              Account settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your personal details and preferences.
            </p>
          </div>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-8 outline-none"
        >
          {/* Personal details */}
          <section
            aria-labelledby="personal-details-heading"
            className="flex flex-col gap-4 rounded-xl border border-border p-5"
          >
            <div className="flex flex-col gap-1">
              <h2
                id="personal-details-heading"
                className="font-heading text-base font-medium"
              >
                Personal details
              </h2>
              <p className="text-sm text-muted-foreground">
                Update the name and email associated with your account.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">First name</FormLabel>
                        <FormControl>
                          <Input
                            className="h-9 text-sm"
                            autoComplete="given-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Last name</FormLabel>
                        <FormControl>
                          <Input
                            className="h-9 text-sm"
                            autoComplete="family-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email address</FormLabel>
                      <FormControl>
                        <Input
                          className="h-9 text-sm"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        We&apos;ll send account notifications to this address.
                      </FormDescription>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-9 px-4 text-sm"
                    disabled={form.formState.isSubmitting}
                  >
                    Save changes
                  </Button>
                  {/* Polite live region announces save success to screen readers. */}
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm text-muted-foreground"
                  >
                    {savedAt ? (
                      `Changes saved at ${savedAt}.`
                    ) : (
                      <span className="sr-only">
                        No unsaved changes announced.
                      </span>
                    )}
                  </p>
                </div>
              </form>
            </Form>
          </section>

          {/* Appearance */}
          <section
            aria-labelledby="appearance-heading"
            className="flex flex-col gap-4 rounded-xl border border-border p-5"
          >
            <div className="flex flex-col gap-1">
              <h2
                id="appearance-heading"
                className="font-heading text-base font-medium"
              >
                Appearance
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose how the interface looks.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span id="theme-label" className="text-sm font-medium">
                Interface theme
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-9 min-w-36 justify-between px-3 text-sm"
                    aria-labelledby="theme-label"
                  >
                    <span className="flex items-center gap-2">
                      <HugeiconsIcon icon={activeTheme.icon} strokeWidth={2} />
                      {activeTheme.label}
                      <span className="sr-only">theme selected</span>
                    </span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuLabel className="text-sm">
                    Interface theme
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value as Theme)}
                  >
                    {THEMES.map(({ value, label, icon }) => (
                      <DropdownMenuRadioItem
                        key={value}
                        value={value}
                        className="text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={icon}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          {label}
                        </span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          {/* Danger zone */}
          <section
            aria-labelledby="danger-heading"
            className="flex flex-col gap-4 rounded-xl border border-destructive/30 p-5"
          >
            <div className="flex flex-col gap-1">
              <h2
                id="danger-heading"
                className="font-heading text-base font-medium text-destructive"
              >
                Delete account
              </h2>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account and all of its data. This action
                cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="h-9 px-4 text-sm"
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Delete account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base text-destructive">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Delete your account?
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                      This permanently deletes your account, profile, and all
                      associated data. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="h-9 px-4 text-sm">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        className="h-9 px-4 text-sm"
                        onClick={() => setDeleted(true)}
                      >
                        <span className="sr-only">Confirm: </span>
                        Yes, delete my account
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <p
                role="status"
                aria-live="assertive"
                className="text-sm text-destructive"
              >
                {deleted
                  ? "Account deletion confirmed (demo - no data was removed)."
                  : null}
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
