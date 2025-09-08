import { Button } from "@elmo/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@elmo/ui/components/card";
import { Separator } from "@elmo/ui/components/separator";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./logo";

interface FullPageCardProps {
	title?: string;
	subtitle?: string;
	children?: ReactNode;
	showButton?: boolean;
	buttonHref?: string;
	buttonText?: string;
	customButton?: ReactNode;
	className?: string;
}

export default function FullPageCard({
	title,
	subtitle,
	children ,
	showButton = false,
	buttonHref = "/",
	buttonText = "Go Back",
	customButton,
	className = "w-md",
}: FullPageCardProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
			<div className={`mx-auto ${className}`}>
				<div className="flex items-center justify-center space-x-3">
					<Logo />
				</div>
				<Card className="my-8">
					{(title || subtitle) && (
						<CardHeader className="text-center">
							{title && <CardTitle className="text-xl">{title}</CardTitle>}
							{subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
						</CardHeader>
					)}
					{children && (
						<>
							{(title || subtitle) && <Separator />}
							<CardContent className={title || subtitle ? "" : "flex flex-col items-center space-y-6 px-12 py-4"}>
								{children}
							</CardContent>
						</>
					)}
				</Card>
				{customButton ? (
					<div className="flex justify-center">{customButton}</div>
				) : showButton ? (
					<div className="flex justify-center">
						<Button asChild size="sm" variant="outline">
							<Link href={buttonHref}>{buttonText}</Link>
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}
