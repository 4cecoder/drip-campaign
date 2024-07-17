"use client"

import React from 'react';
import { MdClose, MdAdd } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, Toaster } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type StageProps = {
    stage: Stage;
    updateStageName: (stageId: number, newName: string) => void;
    deleteStage: (stageId: number) => void;
    addStep: (stageId: number) => void;
    deleteStep: (stepId: number) => void;
    setSelectedStage: (stage: Stage) => void;
    setSelectedStep: (step: Step) => void;
    newStepName: string;
    setNewStepName: (name: string) => void;
};

const StageSkeleton: React.FC = () => (
  <Card className="bg-gray-900 border-gray-800 mb-6">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      <div className="flex items-center mt-4 space-x-2">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-10" />
      </div>
    </CardContent>
  </Card>
);

const Stage: React.FC<StageProps & { isLoading: boolean }> = ({
    stage,
    updateStageName,
    deleteStage,
    addStep,
    deleteStep,
    setSelectedStage,
    setSelectedStep,
    newStepName,
    setNewStepName,
    isLoading,
}) => {
    if (isLoading) {
        return <StageSkeleton />;
    }

    const handleDeleteStage = () => {
        deleteStage(stage.id);
        toast.success('Stage deleted successfully');
    };

    const handleAddStep = () => {
        if (newStepName.trim()) {
            addStep(stage.id);
            toast.success('Step added successfully');
        } else {
            toast.error('Please enter a step name');
        }
    };

    const handleDeleteStep = (stepId: number) => {
        deleteStep(stepId);
        toast.success('Step deleted successfully');
    };

    return (
        <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Input
                    type="text"
                    value={stage.name}
                    onChange={(e) => updateStageName(stage.id, e.target.value)}
                    className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 text-white"
                />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                            <MdClose className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the stage
                                and all its steps.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteStage}>
                                Delete Stage
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {stage.steps?.map((step) => (
                        <li
                            key={step.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-800 cursor-pointer text-gray-300"
                            onClick={() => {
                                setSelectedStage(stage);
                                setSelectedStep(step);
                            }}
                        >
                            <span>{step.name}</span>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MdClose className="h-3 w-3" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the step.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteStep(step.id)}>
                                            Delete Step
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center mt-4 space-x-2">
                    <Input
                        type="text"
                        value={newStepName}
                        onChange={(e) => setNewStepName(e.target.value)}
                        className="flex-grow bg-gray-800 text-white placeholder-gray-400"
                        placeholder="Enter new step"
                    />
                    <Button
                        onClick={handleAddStep}
                        size="icon"
                        className="bg-blue-700 hover:bg-blue-600 text-white"
                    >
                        <MdAdd className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
            <Toaster />
        </Card>
    );
};

export default Stage;