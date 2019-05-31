module PollsTestHelper
  private

  def expected_polls_for_user
    {
      'polls' => [
        {
          'poll_id' => 1,
          'question' => 'Fav snake',
          'categories' => [[3, 'Animals']],
          'options' => [
            {'option_id' => 1, 'option' => 'Python'},
            {'option_id' => 2, 'option' => 'Cobra'},
            {'option_id' => 3,  'option' => 'Viper'},
            {'option_id' => 4, 'option' => 'Mamba'}
          ]
        },
        {
          'poll_id' => 2,
          'question' => 'Fav programming language',
          'categories' => [[1, 'It'], [2, 'Programming languages']],
          'options' => [
            {'option_id' => 1, 'option' => 'Python'},
            {'option_id' => 5, 'option' => 'Java'},
            {'option_id' => 6, 'option' => 'JavaScript'},
            {'option_id' => 7, 'option' => 'Ruby'}
          ]
        },
        {
          'poll_id' => 3,
          'question' => 'Some dumb question',
          'categories' => [],
          'options' => [
            {'option_id' => 12, 'option' => 'Crazy'},
            {'option_id' => 13, 'option' => 'Stupid'},
            {'option_id' => 14, 'option' => 'Annoying'}
          ]
        },
        {
          'poll_id' => 4,
          'question' => 'Fav gems',
          'categories' => [[4, 'Gems']],
          'options' => [
            {'option_id' => 7,  'option' => 'Ruby'},
            {'option_id' => 8,  'option' => 'Gold'},
            {'option_id' => 9,  'option' => 'Dimond'},
            {'option_id' => 10,  'option' => 'Emerald'},
            {'option_id' => 11, 'option' => 'Platinum'}
          ]
        }
      ]
    }

  end

  def create_params
    {
      poll: {
        question: 'My question',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: ['1'],
      }
    }
  end

  def create_dup_params
    {
      poll: {
        question: 'Fav snake',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: ['1']
      }
    }
  end
end
