module PollsTestHelper
  private

  def yasir_snake
    {
      'poll_id' => polls(:yasir_snake).id,
      'question' => 'Fav snake',
      'categories' => [[3, 'Animals']],
      'options' => {
        'Python' => {'option_id' => options(:python).id},
        'Cobra' =>  {'option_id' => options(:cobra).id},
        'Viper' =>  {'option_id' => options(:viper).id},
        'Mamba' =>  {'option_id' => options(:mamba).id}
      }
    }
  end

  def yasir_it
    {
      'poll_id' => polls(:yasir_it).id,
      'question' => 'Fav programming language',
      'categories' => [[1, "It"], [2, 'Programming languages']],
      'options' => {
        'Python'     => {'option_id' => options(:python).id},
        'Java'       => {'option_id' => options(:java).id},
        'JavaScript' => {'option_id' => options(:javascript).id},
        'Ruby'       => {'option_id' => options(:ruby).id}
      }
    }
  end

  def yasir_no_ans
    {
      'poll_id' => polls(:yasir_no_ans).id,
      'question' => 'Some dumb question',
      'categories' => [],
      'options' => {
        'Crazy'    => {'option_id' => options(:crazy).id},
        'Stupid'   => {'option_id' => options(:stupid).id},
        'Annoying' => {'option_id' => options(:annoying).id}
      }
    }
  end

  def david_gems
    {
      'poll_id' => polls(:david_gems).id,
      'question' => 'Fav gems',
      'categories' => [[4, 'Gems']],
      'options' => {
        'Ruby'     => {'option_id' => options(:ruby).id},
        'Gold'     => {'option_id' => options(:gold).id},
        'Dimond'   => {'option_id' => options(:dimond).id},
        'Emerald'  => {'option_id' => options(:emerald).id},
        'Platinum' => {'option_id' => options(:platinum).id}
      }
    }
  end

  def expected_polls_for_user
    {
      'polls' => [
        yasir_snake,
        yasir_it,
        yasir_no_ans,
        david_gems
      ]
    }
  end

  def create_params
    {
      poll: {
        question: 'My question',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: [categories(:it).id],
        age_group_ids: ['1', '2', '3'],
      }
    }
  end

  def create_dup_params
    {
      poll: {
        question: 'Fav snake',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: [categories(:it).id]
      }
    }
  end
end
