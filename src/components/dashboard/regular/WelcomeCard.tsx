import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getGreeting } from "@/utils/formatting/greeting";
import welcomeIllustration from '@/assets/welcome-illustration.png'

const WelcomeCard = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <Card className="overflow-hidden rounded-3xl">
            
            <CardContent
                className="
                    grid
                    grid-cols-[1fr_220px]
                    items-center
                    gap-8
                    px-8
                    py-5
                "
            >
            
                <div className="max-w-xl">
            
                    <h1 className="text-3xl font-bold tracking-tight xl:text-[2.2rem]">
                        {getGreeting()}, {user.username} 👋
                    </h1>
            
                    <p className="mt-2 text-sm text-muted-foreground">
                        Every day is a new page in your story.
                        What will you write today?
                    </p>
            
                </div>
            
                <div className="hidden justify-center lg:flex">
            
                    <img
                        src={welcomeIllustration}
                        alt="Welcome"
                        className="
                            h-22 
                            w-auto 
                            object-contain 
                            transition-transform
                            duration-300
                            hover:scale-110"
                    />
        
                </div>
            
            </CardContent>
            
        </Card>
    );
};

export default WelcomeCard;