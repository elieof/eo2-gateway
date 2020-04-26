import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'topic',
            loadChildren: () => import('./quiz/topic/topic.module').then(m => m.QuizTopicModule)
        },
        {
            path: 'proposition',
            loadChildren: () => import('./quiz/proposition/proposition.module').then(m => m.QuizPropositionModule)
        },
        {
            path: 'question',
            loadChildren: () => import('./quiz/question/question.module').then(m => m.QuizQuestionModule)
        },
        {
            path: 'quiz',
            loadChildren: () => import('./quiz/quiz/quiz.module').then(m => m.QuizQuizModule)
        },
        {
            path: 'q-result',
            loadChildren: () => import('./quiz/q-result/q-result.module').then(m => m.QuizQResultModule)
        }
        /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Eo2GatewayEntityModule {}
