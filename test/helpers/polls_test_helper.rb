module PollsTestHelper
  def expected_polls_for_user
    {
      'polls' => [
        {
          'poll_id' => 1,
          'question' => 'Fav snake',
          'categories' => [[3, 'Animals']],
          'options' => ['Python', 'Cobra', 'Viper', 'Mamba']
        },
        {
          'poll_id' => 2,
          'question' => 'Fav programming language',
          'categories' => [[1, 'It'], [2, 'Programming languages']],
          'options' => ['Python', 'Ruby', 'Java', 'JavaScript']
        },
        {
          'poll_id' => 3,
          'question' => 'Some dumb question',
          'categories' => [],
          'options' => ['Crazy', 'Stupid', 'Annoying']
        },
        {
          'poll_id' => 4,
          'question' => 'Fav gems',
          'categories' => [[4, 'Gems']],
          'options' => ['Platinum', 'Dimond', 'Gold', 'Ruby']
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
