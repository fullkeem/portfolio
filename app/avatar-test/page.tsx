'use client';

import { Avatar3D } from '@/components/3d/Avatar3D';

export default function Avatar3DTestPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-12 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Avatar 3D Test
        </h1>
        <p className="text-muted-foreground">
          미니멀 클린 이니셜 아바타 테스트
        </p>
      </div>

      {/* 다양한 크기 테스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
        <div className="text-center space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Small</h3>
          <Avatar3D size="sm" animationSpeed="fast" />
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Medium</h3>
          <Avatar3D size="md" animationSpeed="normal" />
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Large</h3>
          <Avatar3D size="lg" animationSpeed="normal" />
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Extra Large</h3>
          <Avatar3D size="xl" animationSpeed="slow" />
        </div>
      </div>

      {/* 단일 큰 아바타 */}
      <div className="text-center space-y-6">
        <h3 className="text-lg font-medium">Main Avatar</h3>
        <Avatar3D 
          size="xl" 
          animationSpeed="normal"
          className="transform hover:scale-110 transition-transform duration-500"
        />
        <p className="text-sm text-muted-foreground max-w-md">
          마우스를 올려보세요! 클릭도 해보세요!<br/>
          CSS 3D Transform + Framer Motion 조합
        </p>
      </div>

      {/* 인터랙션 비활성화 버전 */}
      <div className="text-center space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">No Interaction</h3>
        <Avatar3D 
          size="md" 
          enableInteraction={false}
          animationSpeed="slow"
        />
      </div>
    </div>
  );
}
