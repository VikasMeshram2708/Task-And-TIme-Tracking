import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ProfileDetails({
  totalTasks,
}: {
  totalTasks: number;
}) {
  const { getPermission, getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    notFound();
  }

  if (!(await getPermission("crud:task"))?.isGranted) {
    throw new Error("Unauthorized");
  }

  const user = await getUser();

  if (!user?.email) {
    notFound();
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user.given_name && user.family_name) {
      return `${user.given_name[0]}${user.family_name[0]}`.toUpperCase();
    } else if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-muted bg-primary text-primary-foreground">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">
              {user.given_name} {user.family_name}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          <Badge
            variant="outline"
            className="bg-primary/10 text-primary text-xs whitespace-nowrap"
          >
            {(await getPermission("crud:task"))?.isGranted
              ? "Full Access"
              : "Limited Access"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary text-lg whitespace-nowrap"
        >
          Total Task : {totalTasks}
        </Badge>
      </CardFooter>
    </Card>
  );
}
