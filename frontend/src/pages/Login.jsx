import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {

    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }


    return (
        <div className="flex mt-28 justify-center w-full">
            <Tabs defaultValue="account" className="w-100">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>SignUp</CardTitle>
                            <CardDescription>
                                Create your account and start learning.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                type="text"
                                placeholder="eg. Akash"
                                required="true"
                                name="name"
                                value={signupInput.name}
                                onChange={(e)=>{changeInputHandler(e,"signup")}} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                type="email"
                                name="email" 
                                value={signupInput.email}required="true"
                                onChange={(e)=>{changeInputHandler(e,"signup")}} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                type="password"
                                name="password"
                                value={signupInput.password}
                                required="true"
                                onChange={(e)=>{changeInputHandler(e,"signup")}} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=> handleRegistration("login")}>Sign Up</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Welcome back! Continue your learning journey.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                type="email"
                                name="email"
                                value={loginInput.email}
                                required="true"
                                onChange={(e)=>{changeInputHandler(e,"login")}} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                type="password"
                                name="password"
                                value={loginInput.password}
                                required="true"
                                onChange={(e)=>{changeInputHandler(e,"login")}} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=> handleRegistration("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login;