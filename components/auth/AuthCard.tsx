import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from './BackButton';
import Socials from './Socials';

interface CardWrapperProps {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
    showSocials?: boolean;
}

export default function AuthCard({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocials
}: CardWrapperProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocials && (
                <CardFooter>
                    <Socials />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    );
}
