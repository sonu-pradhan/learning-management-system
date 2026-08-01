import { useLoginUserMutation, useRegisterUserMutation } from "@/api/authApi"
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
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

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

    const [
        registerUser,
        {
            data: registerData,
            error: registerError,
            isLoading: registerIsLoading,
            isSuccess: registerIsSuccess
        }
    ] = useRegisterUserMutation();
    const [
        loginUser,
        {
            data: loginData,
            error: loginError,
            isLoading: loginIsLoading,
            isSuccess: loginIsSuccess
        }
    ] = useLoginUserMutation();

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
    };

    const navigate = useNavigate();
    
    useEffect(() => {
    if (registerIsSuccess && registerData) {
        toast.success(registerData?.message || "Signup successful");
    }

    if (registerError) {
        toast.error(registerError?.data?.message || "Signup failed");
    }

    if (loginIsSuccess && loginData) {
        toast.success(loginData?.message || "Login successful");
        navigate("/")
    }

    if (loginError) {
        toast.error(loginError?.data?.message || "Login failed");
    }
}, [
    registerIsSuccess,
    registerData,
    registerError,
    loginIsSuccess,
    loginData,
    loginError
]);


    return (
        <div className="flex mt-30 justify-center w-full">
            <Tabs defaultValue="account" className="w-100">
                <TabsList className="grid w-full grid-cols-2 bg-[#cbcaa5]">
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                Create your account and start learning.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    required={true}
                                    name="name"
                                    value={signupInput.name}
                                    onChange={(e) => { changeInputHandler(e, "signup") }} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={signupInput.email}
                                    required={true}
                                    onChange={(e) => { changeInputHandler(e, "signup") }} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={signupInput.password}
                                    required={true}
                                    onChange={(e) => { changeInputHandler(e, "signup") }} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-[#385356] mx-auto" disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                                {
                                    registerIsLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : "Sign Up"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
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
                                    required={true}
                                    onChange={(e) => { changeInputHandler(e, "login") }} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={loginInput.password}
                                    required={true}
                                    onChange={(e) => { changeInputHandler(e, "login") }} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-[#385356] mx-auto" disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                                {
                                    loginIsLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login;