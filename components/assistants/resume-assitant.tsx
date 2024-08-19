"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface AssistantProps {
  threadId: string | null;
  createThread: () => Promise<void>;
}

interface ResumeSection {
  section_name: string;
  content: Record<string, any> | Array<Record<string, any>>;
}

interface AssistantResponse {
  main_response: string;
  relevant_sections: ResumeSection[];
  follow_up_questions: string[];
  dashboard_data: any;
}

interface Message {
  role: string;
  content: string | AssistantResponse;
}

const ResumeAssistant: React.FC = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const suggestedQuestions = [
    "Load Resume Dashboard",
    // Add more suggested questions here
  ];

  useEffect(() => {
    createThread();
  }, []);

  useEffect(() => {}, [messages]);

  const createThread = async () => {
    const response = await fetch("/api/portfolio-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create_thread" }),
    });
    const data = await response.json();
    setThreadId(data.thread_id);
  };

  const sendMessage = async (messageText: string) => {
    if (!threadId || !messageText) return;

    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageText },
    ]);
    setInput("");

    console.log("Sending message:", messageText); // Add this line

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch("/api/portfolio-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_message",
          threadId,
          message: messageText,
        }),
        signal: abortControllerRef.current.signal,
      });

      console.log("Response status:", response.status); // Add this line

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("ReadableStream not supported");
      }

      let partialResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        console.log("Received chunk:", chunk); // Add this line
        partialResponse += chunk;

        // Split the partial response by newline characters
        const jsonStrings = partialResponse.split("\n");

        // Process all complete JSON objects
        for (let i = 0; i < jsonStrings.length - 1; i++) {
          try {
            const parsedChunk = JSON.parse(jsonStrings[i]);
            console.log("Parsed chunk:", parsedChunk);
            if (parsedChunk.status && parsedChunk.status !== "completed") {
              console.log("Status update:", parsedChunk.status);
            } else if (parsedChunk.main_response) {
              console.log("Updating messages with:", parsedChunk); // Add this line
              setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: parsedChunk },
              ]);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }

        // Keep the last (potentially incomplete) JSON string
        partialResponse = jsonStrings[jsonStrings.length - 1];
      }
    } catch (error: unknown) {
      console.error("Error in sendMessage:", error); // Modify this line
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error sending message:", error.message);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: "I'm sorry, I encountered an error. Please try again.",
            },
          ]);
        }
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const formatKey = (key: string): string => {
    return key
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderContent = (content: any): React.ReactNode => {
    if (typeof content === "string") {
      return <p className="mb-2">{content}</p>;
    } else if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-4">
          {content.map((item, index) => (
            <li key={index} className="mb-4">
              {typeof item === "object" ? (
                <div className="ml-4 space-y-2">
                  {Object.entries(item).map(([key, value], i) => (
                    <div key={i} className="mb-2">
                      <span className="font-medium text-gray-300">
                        {formatKey(key)}:{" "}
                      </span>
                      {renderContent(value)}
                    </div>
                  ))}
                </div>
              ) : (
                renderContent(item)
              )}
            </li>
          ))}
        </ul>
      );
    } else if (typeof content === "object" && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value], index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold text-gray-200 mb-2">
                {formatKey(key)}
              </h4>
              <div className="ml-4">{renderContent(value)}</div>
            </div>
          ))}
        </div>
      );
    }
    return <p className="mb-2">{String(content)}</p>;
  };

  const renderDashboardData = (dashboardData: any) => {
    if (isLoading) {
      return (
        <Card className="w-full bg-gray-800 text-gray-200">
          <CardHeader>
            <CardTitle>Portfolio Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              {["education", "experience", "projects", "skills"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-[150px]" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full bg-gray-800 text-gray-200">
        <CardHeader>
          <CardTitle>Resume Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="education" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData.education.map((edu: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p>{edu.institution}</p>
                      <p>{edu.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData.experience.length > 0 ? (
                    dashboardData.experience.map((exp: any, index: number) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p>{exp.company}</p>
                        <p>{exp.duration}</p>
                        <p className="whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No experience data available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData.projects.map((project: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">
                        {project.name || `Project ${index + 1}`}
                      </h4>
                      <p className="whitespace-pre-line">
                        {project.description}
                      </p>
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <p>Technologies: {project.technologies.join(", ")}</p>
                        )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData.skills.map((skill: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">{skill.category}</h4>
                      <p>{skill.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  const renderAssistantResponse = (content: string | AssistantResponse) => {
    if (typeof content === "string") {
      return <p>{content}</p>;
    }

    return (
      <div className="space-y-4">
        <div>{content.main_response}</div>
        {(isLoading || content.dashboard_data) && (
          <div className="mt-4">
            {renderDashboardData(content.dashboard_data)}
          </div>
        )}
        {content.follow_up_questions &&
          content.follow_up_questions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {content.follow_up_questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
      </div>
    );
  };

  const handleDownloadResume = () => {
    const resumeUrl = "/Arek_Halpern_Resume_2024.pdf";
    window.open(resumeUrl, "_blank");
  };

  const handleSuggestedQuestion = (question: string) => {
    console.log("Handling suggested question:", question);
    sendMessage(question);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(80vh-2rem)] bg-gray-950 text-gray-200 border border-gray-800 rounded-lg">
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center flex-grow">
          <Bot className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Resume Assistant</span>
        </div>
        <button
          onClick={handleDownloadResume}
          className="flex items-center text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors ml-2"
        >
          <Download className="w-4 h-4 mr-1" />
          Download Resume
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-400 mb-4">How can I assist you today?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-sm bg-gray-700 text-gray-200 px-3 py-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-gray-800 text-gray-200"
                  : "bg-gray-900 text-gray-200"
              }`}
            >
              {typeof msg.content === "string" ? (
                <p>{msg.content}</p>
              ) : (
                renderAssistantResponse(msg.content)
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="w-full p-2 rounded-lg bg-gray-900 text-gray-200">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-20 w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="p-3 border-t border-gray-800"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my portfolio..."
            className="flex-1 p-2 bg-gray-900 text-gray-200 border border-gray-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="border border-gray-600 text-gray-200 p-2 rounded-r-md hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeAssistant;
