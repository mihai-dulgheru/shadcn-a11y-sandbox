import {
  Analytics01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowUpDownIcon,
  DashboardSquare01Icon,
  Settings01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- Sidebar navigation ----------------------------------------------------
const NAV = [
  { id: "overview", label: "Dashboard", icon: DashboardSquare01Icon },
  { id: "analytics", label: "Analytics", icon: Analytics01Icon },
  { id: "team", label: "Team", icon: UserIcon },
  // `route` items navigate to a real page instead of switching in-page sections.
  {
    id: "settings",
    label: "Settings",
    icon: Settings01Icon,
    route: "/settings",
  },
] as const;

const NAV_LINK_CLASS =
  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// --- Table data ------------------------------------------------------------
type Row = { name: string; email: string; role: string; status: string };
const ROWS: Row[] = [
  {
    name: "Ada Lovelace",
    email: "ada@acme.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Grace Hopper",
    email: "grace@acme.com",
    role: "Editor",
    status: "Active",
  },
  {
    name: "Alan Turing",
    email: "alan@acme.com",
    role: "Viewer",
    status: "Invited",
  },
  {
    name: "Katherine Johnson",
    email: "kat@acme.com",
    role: "Editor",
    status: "Active",
  },
  {
    name: "Linus Torvalds",
    email: "linus@acme.com",
    role: "Admin",
    status: "Suspended",
  },
];

const COLUMNS: { key: keyof Row; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

type SortDir = "ascending" | "descending";

export default function DashboardPage() {
  const [activeNav, setActiveNav] =
    React.useState<(typeof NAV)[number]["id"]>("overview");

  const [sort, setSort] = React.useState<{ key: keyof Row; dir: SortDir }>({
    key: "name",
    dir: "ascending",
  });

  const sortedRows = React.useMemo(() => {
    const copy = [...ROWS];
    copy.sort((a, b) => {
      const cmp = a[sort.key].localeCompare(b[sort.key]);
      return sort.dir === "ascending" ? cmp : -cmp;
    });
    return copy;
  }, [sort]);

  function toggleSort(key: keyof Row) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "ascending" ? "descending" : "ascending" }
        : { key, dir: "ascending" },
    );
  }

  const [storage, setStorage] = React.useState<number[]>([60]);
  const profileCompletion = 72;

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      {/* 1. Skip link - visually hidden until focused via keyboard. */}
      <a
        href="#main-content"
        className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:not-sr-only focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Skip to main content
      </a>

      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* 2. <header> landmark */}
        <header className="flex h-14 items-center gap-3 border-b border-border px-4">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HugeiconsIcon
              icon={DashboardSquare01Icon}
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
          <span className="font-heading text-base font-semibold tracking-tight">
            Acme Console
          </span>
        </header>

        <div className="flex flex-1">
          {/* 2 + 3. <aside> landmark containing <nav> with aria-current */}
          <aside className="w-56 shrink-0 border-r border-border p-3">
            <nav aria-label="Primary">
              <ul className="flex flex-col gap-1">
                {NAV.map((item) => {
                  const { id, label, icon } = item;
                  const route = "route" in item ? item.route : undefined;
                  const icn = (
                    <HugeiconsIcon
                      icon={icon}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="size-4"
                    />
                  );

                  // Cross-page link (e.g. Settings) - real navigation.
                  if (route) {
                    return (
                      <li key={id}>
                        <Link
                          href={route}
                          className={cn(
                            NAV_LINK_CLASS,
                            "text-muted-foreground",
                          )}
                        >
                          {icn}
                          {label}
                        </Link>
                      </li>
                    );
                  }

                  // In-page section link with aria-current on the active item.
                  const isActive = id === activeNav;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveNav(id);
                        }}
                        className={cn(
                          NAV_LINK_CLASS,
                          isActive
                            ? "bg-muted text-foreground aria-[current=page]:font-semibold"
                            : "text-muted-foreground",
                        )}
                      >
                        {icn}
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* 4. <main> landmark */}
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 p-6 outline-none"
          >
            <h1 className="font-heading text-xl font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your team and account activity.
            </p>

            <Tabs defaultValue="members" className="mt-6">
              <TabsList aria-label="Dashboard sections">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>

              {/* 5. Tab one: sortable Table with aria-sort */}
              <TabsContent value="members">
                <div className="rounded-xl border border-border">
                  <Table>
                    <TableCaption className="sr-only">
                      Team members. Use the column header buttons to sort.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        {COLUMNS.map(({ key, label }) => {
                          const isSorted = sort.key === key;
                          const ariaSort = isSorted ? sort.dir : "none";
                          const SortIcon = !isSorted
                            ? ArrowUpDownIcon
                            : sort.dir === "ascending"
                              ? ArrowUp01Icon
                              : ArrowDown01Icon;
                          return (
                            <TableHead
                              key={key}
                              aria-sort={ariaSort}
                              scope="col"
                            >
                              <button
                                type="button"
                                onClick={() => toggleSort(key)}
                                className="-mx-2 flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                              >
                                {label}
                                <HugeiconsIcon
                                  icon={SortIcon}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                  className="size-3.5"
                                />
                                <span className="sr-only">
                                  {isSorted
                                    ? `, sorted ${sort.dir}. Activate to sort ${
                                        sort.dir === "ascending"
                                          ? "descending"
                                          : "ascending"
                                      }`
                                    : ", not sorted. Activate to sort ascending"}
                                </span>
                              </button>
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedRows.map((row) => (
                        <TableRow key={row.email}>
                          <TableCell className="font-medium text-foreground">
                            {row.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {row.email}
                          </TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* 6. Tab two: Slider + Progress with aria-value* */}
              <TabsContent value="usage">
                <div className="flex max-w-md flex-col gap-8 rounded-xl border border-border p-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label
                        id="storage-label"
                        htmlFor="storage-slider"
                        className="text-sm font-medium"
                      >
                        Storage allocation
                      </label>
                      <span
                        aria-hidden="true"
                        className="text-sm text-muted-foreground"
                      >
                        {storage[0]} GB
                      </span>
                    </div>
                    <Slider
                      id="storage-slider"
                      value={storage}
                      onValueChange={setStorage}
                      min={0}
                      max={100}
                      step={5}
                      aria-labelledby="storage-label"
                      aria-valuetext={`${storage[0]} gigabytes`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span
                        id="profile-progress-label"
                        className="text-sm font-medium"
                      >
                        Profile completion
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-sm text-muted-foreground"
                      >
                        {profileCompletion}%
                      </span>
                    </div>
                    <Progress
                      value={profileCompletion}
                      max={100}
                      aria-labelledby="profile-progress-label"
                      aria-valuetext={`${profileCompletion} percent complete`}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        {/* <footer> landmark */}
        <footer className="border-t border-border px-4 py-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Acme Inc. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
